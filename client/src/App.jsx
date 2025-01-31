import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "../stores/authStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import MyChannel from "./pages/MyChannel";
import CreateVideo from "./pages/CreateVideo";
import Watch from "./pages/Watch";
import YourVideos from "./pages/YourVideos";

const App = () => {
  const { authUser, checkAuth, isLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/my-channel" element={<MyChannel />} />
        <Route path="/create-video" element={<CreateVideo />} />
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/your-videos" element={<YourVideos />} />
      </Routes>
    </>
  );
};

export default App;
