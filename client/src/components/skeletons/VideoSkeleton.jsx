import React from "react";

const VideoSkeleton = () => {
  return (
    <div className="animate-pulse w-full max-w-[343px] sm:max-w-full">
      {/* Видео-заглушка */}
      <div className="w-full h-[193px] bg-gray-300 rounded-md"></div>

      <div className="flex items-start gap-3 mt-2">
        {/* Аватар-заглушка */}
        <div className="h-[35px] w-[35px] bg-gray-300 rounded-full"></div>

        {/* Текст-заглушки */}
        <div className="flex flex-col gap-2 w-full">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoSkeleton;
