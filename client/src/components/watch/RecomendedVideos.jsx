import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../utils/axios";
import { formatDuration } from "../../../utils/formatDuration.js";
import { formatTimeAgo } from "../../../utils/formatTime.js";
import { Link } from "react-router-dom";

const RecomendedVideos = () => {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const response = await axiosInstance.get("/videos");
      setVideos(response.data.videos);
      console.log(response);
    } catch (error) {
      console.log("error fetching videos:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const scrollView = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {videos &&
        videos.map((video) => (
          <Link
            onClick={scrollView}
            to={`/watch/${video._id}`}
            className="my-3 md:flex gap-2"
            key={video._id}
          >
            <div className="w-full h-[210px] md:w-[170px] md:h-[100px] relative">
              <video
                className="w-full h-full rounded-md object-cover"
                src={video?.videoUrl}
                poster={video?.videoImage}
              ></video>
              <p className="absolute text-[18px] bottom-2 bg-gray-600 px-1 rounded-md text-white right-2 md:text-[12px] md:bottom-1 md:right-1">
                {formatDuration(video?.duration)}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <img
                  className="h-[40px] my-1 w-[40px] object-cover rounded-full md:hidden"
                  src={video?.userId?.profilePic}
                />
                <p className="font-meduim text-[18px] truncate">
                  {video?.title}
                </p>
              </div>
              <p className="text-gray-500 md:mt-3 truncate">
                {video?.userId?.username}
              </p>
              <div className="flex items-center gap-3">
                <p className="text-gray-500">{video?.views} views</p>
                <p className="text-gray-500">
                  {formatTimeAgo(video?.createdAt)}
                </p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default RecomendedVideos;
