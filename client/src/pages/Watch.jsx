import React from "react";
import Container from "../components/common/Container";
import Video from "../components/watch/Video";
import Header from "../components/layout/Header";
import RecomendedVideos from "../components/watch/RecomendedVideos";
import Comments from "../components/watch/Comments";

const Watch = () => {
  return (
    <div className="pt-3 md:py-0">
      <Container>
        <div className="hidden md:block">
          <Header />
        </div>
        <div className="md:flex gap-7">
          {/* Video */}
          <section className="md:ml-[30px]">
            <Video />
          </section>
          <section>
            <RecomendedVideos />
          </section>
        </div>
      </Container>
    </div>
  );
};

export default Watch;
