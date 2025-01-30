import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Container from "../common/Container";
import { axiosInstance } from "../../../utils/axios";
import Video from "../common/Video";
import VideoSkeleton from "../skeletons/VideoSkeleton";
import { Link } from "react-router-dom";

const Main = ({ showMiniNavbar }) => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/videos");
      setVideos(response.data.videos);
      console.log(response);
    } catch (error) {
      console.log("error fetching videos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <main>
      <Container>
        <div className="flex gap-[80px]">
          <div className="hidden sm:block">
            <SideBar showMiniNavbar={showMiniNavbar} />
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3 w-full">
            {isLoading
              ? Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <div className="my-[40px]" key={index}>
                      <VideoSkeleton />
                    </div>
                  ))
              : videos.map((video) => (
                  <Link
                    to={`/watch/${video._id}`}
                    className="my-[40px]"
                    key={video._id}
                  >
                    <Video
                      title={video.title}
                      coverImage={video.videoImage}
                      videoSrc={video.videoUrl}
                      duration={video.duration}
                      views={video.views}
                      createdAt={video.createdAt}
                      username={video.userId.username}
                      profilePic={video.userId.profilePic}
                    />
                  </Link>
                ))}
          </div>
        </div>
      </Container>
    </main>
  );
};

export default Main;
