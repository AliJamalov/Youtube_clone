import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../utils/axios";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { formatTimeAgo } from "../../../utils/formatTime";
import Comments from "./Comments";

const Video = () => {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const fetchVideoById = async () => {
    try {
      const response = await axiosInstance.get(`/videos/${id}`);
      setVideo(response.data.singleVideo);
    } catch (error) {
      console.log("error fetching video:", error);
    }
  };

  useEffect(() => {
    fetchVideoById();
  }, [id]);

  return (
    <div className="w-full h-full md:w-[853px] md:h-[480px]">
      <div className="w-full h-full">
        <video
          className="w-full h-full rounded-2xl"
          src={video?.videoUrl}
          controls
        ></video>
      </div>
      <p className="my-2 font-semibold text-[24px]">{video?.title}</p>
      {/* Video details */}
      <div className="flex items-center gap-5">
        <div className="h-[40px] w-[40px]">
          <img
            className="w-full h-full rounded-full object-cover"
            src={video?.userId?.profilePic}
            alt="profile-image"
          />
        </div>
        <div>
          <p className="font-medium text-[16px]">{video?.userId?.username}</p>
          <p className="font-medium text-[#606060] text-[14px]">
            {video?.userId?.followersCount || 0} subscribers
          </p>
        </div>
        <button className="text-white bg-black rounded-4xl px-3 py-2 cursor-pointer">
          Subscribe
        </button>
        <div className="flex items-center gap-3">
          <AiOutlineLike className="cursor-pointer" size={25} />
          <p className="text-black text-[14px] font-medium">
            {video?.likes || 0}
          </p>
          <AiOutlineDislike className="cursor-pointer" size={25} />
          <p className="text-black text-[14px] font-medium">
            {video?.disLikes || 0}
          </p>
        </div>
      </div>
      {/* Description */}
      <p
        className="cursor-pointer my-1"
        onClick={() => setIsOpenModal(!isOpenModal)}
      >
        more...
      </p>
      {isOpenModal && (
        <div className="bg-gray-300 p-2 rounded-md">
          <p>{formatTimeAgo(video?.createdAt)}</p>
          <p>{video?.views} views</p>
          <p>{video?.description}</p>
          <p className="text-blue-500">{video?.tags}</p>
          <p
            onClick={() => setIsOpenModal(!isOpenModal)}
            className="text-[14px] text-gray-500 mt-3 cursor-pointer"
          >
            Show less
          </p>
        </div>
      )}
      <Comments />
    </div>
  );
};

export default Video;
