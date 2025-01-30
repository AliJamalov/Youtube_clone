import Container from "../components/common/Container";
import React, { useState } from "react";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import { axiosInstance } from "../../utils/axios";
import { uploadToCloudinary } from "../../utils/cloudinary";
import toast from "react-hot-toast";

const CreateVideo = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    videoFile: null, // Видео файл
    imageFile: null, // Обложка файл
    duration: 0,
    shorts: false,
  });
  const [loading, setLoading] = useState(false);
  const [prevImage, setPrevImage] = useState(null);
  const [prevVideo, setPrevVideo] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];

    if (file) {
      if (type === "videoFile") {
        // Вычисляем длительность видео
        const videoElement = document.createElement("video");
        videoElement.preload = "metadata";
        videoElement.onloadedmetadata = () => {
          window.URL.revokeObjectURL(videoElement.src); // Очищаем URL
          const videoDuration = Math.floor(videoElement.duration); // Длительность в секундах
          setFormData((prev) => ({
            ...prev,
            [type]: file,
            duration: videoDuration,
            shorts: videoDuration <= 30,
          }));
        };
        videoElement.src = URL.createObjectURL(file);
        setPrevVideo(URL.createObjectURL(file));
      } else {
        // Для обложки сохраняем URL для предварительного просмотра
        setFormData((prev) => ({ ...prev, [type]: file }));
        setPrevImage(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadProgress(0);

    try {
      const videoUrl = await uploadToCloudinary(
        formData.videoFile,
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        "Youtube_clone/videos",
        setUploadProgress
      );

      const videoImage = await uploadToCloudinary(
        formData.imageFile,
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        "Youtube_clone/images"
      );

      const response = await axiosInstance.post("/videos", {
        title: formData.title,
        description: formData.description,
        tags: formData.tags.split(","),
        videoUrl,
        videoImage,
        duration: formData.duration,
        shorts: formData.shorts,
      });

      if (response.status === 201) {
        toast.success("Video uploaded successfuly!");
        setFormData({
          title: "",
          description: "",
          tags: "",
          videoFile: null,
          imageFile: null,
          duration: 0,
          shorts: false,
        });
        setUploadProgress(0);
      }
    } catch (error) {
      console.error("error:", error);
      toast.error("Error creating video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container>
        <div className="flex flex-col items-center justify-center mt-5">
          <form onSubmit={handleSubmit} className="w-[300px]">
            <h1 className="text-2xl font-medium">Upload video</h1>

            {/* Title */}
            <div className="mt-3">
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="title..."
                required
              />
            </div>

            {/* Description */}
            <div className="mt-3">
              <Label>Description</Label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="border border-black p-2 w-full rounded-md outline-none"
                placeholder="description..."
                required
              />
            </div>

            {/* Tags */}
            <div className="mt-3">
              <Label>Tags</Label>
              <Input
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                placeholder="tags... (comma-separated)"
                required
              />
            </div>

            {/* Video Image */}
            <div className="mt-3">
              <Label>Image File</Label>
              <label
                htmlFor="image-upload"
                className="flex items-center justify-center gap-2 w-full p-2 bg-green-500 text-white rounded-md cursor-pointer hover:bg-green-600 transition"
              >
                🖼️ Upload Image
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "imageFile")}
                  className="hidden"
                  required
                />
              </label>
            </div>
            {prevImage && (
              <div className="w-[100px] h-[100px] mt-3">
                <img
                  className="w-full h-full object-cover rounded-md"
                  src={prevImage}
                  alt="prev-img"
                />
              </div>
            )}
            {/* Video File */}
            <div className="mt-3">
              <Label>Video File</Label>
              <label
                htmlFor="video-upload"
                className="flex items-center justify-center gap-2 w-full p-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition"
              >
                🎥 Upload Video
                <input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileChange(e, "videoFile")}
                  className="hidden"
                  required
                />
              </label>
            </div>
            {prevVideo && (
              <div className="w-full h-[150px] mt-3">
                <video
                  className="w-full h-full object-cover rounded-md"
                  src={prevVideo}
                  controls
                ></video>
              </div>
            )}
            {/* Loading progress */}
            {loading && (
              <div className="w-full bg-gray-300 rounded-md mt-3">
                <div
                  className="bg-blue-500 text-xs font-medium text-white text-center p-1 leading-none rounded-md"
                  style={{ width: `${uploadProgress}%` }}
                >
                  {uploadProgress}%
                </div>
              </div>
            )}
            {/* Submit Button */}
            <div className="my-5">
              <button
                type="submit"
                className={`${
                  loading ? "bg-blue-300" : "bg-blue-500"
                } text-white p-2 rounded-md w-full cursor-pointer`}
                disabled={loading}
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default CreateVideo;
