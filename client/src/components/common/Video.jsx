import React from "react";
import { formatDuration } from "../../../utils/formatDuration.js";
import { formatTimeAgo } from "../../../utils/formatTime.js";

const Video = ({
  title,
  coverImage,
  videoSrc,
  duration,
  views,
  createdAt,
  username,
  profilePic,
}) => {
  return (
    <div className="mx-auto w-full">
      <div className="h-[193px] relative w-full">
        <video
          className="rounded-md w-full h-full object-cover"
          poster={coverImage}
          src={videoSrc}
        ></video>
        <p className="absolute bottom-2 bg-gray-600 px-1 rounded-md text-white right-2">
          {formatDuration(duration)}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <div className="h-[35px] w-[35px]">
            <img
              className="rounded-full w-full h-full object-cover"
              src={profilePic}
              alt="profile-pic"
            />
          </div>
          <div>
            <p className="text-[16px] font-semibold">{title}</p>
            <p>{username}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-[47px]">
          <p className="text-gray-500">{views}</p>
          <p className="text-gray-500">{formatTimeAgo(createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default Video;
