import React, { useState } from "react";
import Label from "../ui/Label";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { axiosInstance } from "../../../utils/axios";
import { uploadToCloudinary } from "../../../utils/cloudinary";
import toast from "react-hot-toast";

const EditModal = ({ handleOpenEditModal, video, fetchVideos }) => {
  const [title, setTitle] = useState(video?.title || "");
  const [tags, setTags] = useState(video?.tags?.join(", ") || "");
  const [description, setDescription] = useState(video?.description || "");
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleEdit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = video.videoImage;

      if (imageFile) {
        imageUrl = await uploadToCloudinary(
          imageFile,
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
          "Youtube_clone/images",
          setUploadProgress
        );
      }

      await axiosInstance.patch(`/videos/${video._id}`, {
        title,
        description,
        tags,
        videoImage: imageUrl,
      });

      toast.success("Video updated successfully!");
      fetchVideos();
      handleOpenEditModal();
    } catch (error) {
      console.error("Error updating video:", error);
      toast.error("Failed to update video");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-300 rounded-md p-4 shadow-md w-[300px] flex flex-col">
      <h1 className="text-center my-2 text-[20px]">Edit video</h1>
      <form onSubmit={handleEdit}>
        <div>
          <Label>Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mt-2">
          <Label>Tags (comma separated)</Label>
          <Input value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
        <div className="mt-2">
          <Label>Cover image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>
        {/* Превью изображения */}
        <div className="w-[70px] h-[70px] mt-2">
          <img
            className="w-full h-full object-cover rounded-md"
            src={imageFile ? URL.createObjectURL(imageFile) : video.videoImage}
            alt="Cover"
          />
        </div>

        {/* Прогресс загрузки */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="mt-2 text-center text-sm text-gray-700">
            Uploading: {uploadProgress}%
          </div>
        )}

        <div className="mt-2">
          <Label>Description</Label>
          <textarea
            className="w-full border border-black rounded-md p-1 outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between mt-3">
          <Button
            type="button"
            onClick={handleOpenEditModal}
            className="bg-black"
          >
            Close
          </Button>
          <Button type="submit" className="bg-blue-500">
            {isLoading ? "Updating..." : "Edit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
