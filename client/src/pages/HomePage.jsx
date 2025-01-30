import React, { useState } from "react";
import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import Main from "../components/home/Main";

const HomePage = () => {
  const [showMiniNavbar, setShowMininavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowMininavbar(!showMiniNavbar);
  };

  return (
    <div>
      <Header handleShowNavbar={handleShowNavbar} />
      <Main showMiniNavbar={showMiniNavbar} />
      <Navbar />
    </div>
  );
};

export default HomePage;
