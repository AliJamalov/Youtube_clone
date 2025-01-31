import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import EditModal from "../components/yourVideos/EditModal";

const YourVideos = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/videos/byUser");
      setVideos(response.data);
    } catch (error) {
      console.log("error fetching videos", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/videos/${selectedVideoId}`);
      if (response.status === 200) {
        toast.success("Video deleted!");
        fetchVideos();
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleOpenEditModal = (video) => {
    setIsOpenEditModal(!isOpenEditModal);
    setSelectedVideo(video);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" color="red" />
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mt-5 text-[32px] font-semibold">Your videos</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-3">
        {videos &&
          videos.map((video) => (
            <div className="pb-2 bg-red-600 rounded-md" key={video._id}>
              <video
                src={video.videoUrl}
                poster={video.videoImage}
                className="w-[300px] h-[200px] object-cover rounded-tl-md rounded-tr-md"
                controls
              ></video>
              <div className="text-white mx-2 mt-1 flex justify-between">
                <button
                  onClick={() => handleOpenEditModal(video)}
                  className="cursor-pointer"
                >
                  Edit
                </button>
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedVideoId(video._id);
                    setIsOpenConfirmModal(!isOpenConfirmModal);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
      {isOpenConfirmModal && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold text-center mb-4">
              Are you sure?
            </h2>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition cursor-pointer"
                onClick={() => setIsOpenConfirmModal(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition cursor-pointer"
                onClick={() => {
                  handleDelete();
                  setIsOpenConfirmModal(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {isOpenEditModal && (
        <div className="flex items-center justify-center fixed inset-0 h-screen">
          <EditModal
            video={selectedVideo}
            handleOpenEditModal={handleOpenEditModal}
            fetchVideos={fetchVideos}
          />
        </div>
      )}
    </div>
  );
};

export default YourVideos;
