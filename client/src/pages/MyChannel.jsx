import React, { useState } from "react";
import Container from "../components/common/Container";
import { useAuthStore } from "../../stores/authStore";
import banerImage from "../assets/images/baner-image.avif";
import Button from "../components/ui/Button";
import { FaRegUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { axiosInstance } from "../../utils/axios";

const MyChannel = () => {
  const { authUser } = useAuthStore();

  const [formData, setFormData] = useState({
    profileBanner: "",
    profilePic: "",
    about: "",
  });

  const [preview, setPreview] = useState({
    profileBanner: authUser?.profileBanner || "",
    profilePic: authUser?.profilePic || "",
  });

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [field]: reader.result }); // Сохраняем Base64
        setPreview({ ...preview, [field]: URL.createObjectURL(file) });
      };
      reader.readAsDataURL(file); // Преобразуем файл в Base64
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      profileBanner: formData.profileBanner,
      profilePic: formData.profilePic,
      about: formData.about,
    };

    try {
      const response = await axiosInstance.patch("/user", dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setFormData({ profileBanner: "", profilePic: "", about: "" });
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div>
      <Container>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-col mt-[50px]"
        >
          <h1 className="font-medium text-2xl">Channel customization</h1>
          {/* Banner image */}
          <div className="mt-3">
            <p className="font-medium text-[16px]">Banner image</p>
            <p>This image will appear across the top of your channel</p>
            {preview.profileBanner ? (
              <div className="mt-3">
                <img
                  className="w-[200px] h-[100px] rounded-sm object-cover"
                  src={preview.profileBanner}
                  alt="Banner preview"
                />
              </div>
            ) : (
              <img
                className="w-[200px] h-[100px] rounded-sm object-cover mt-3"
                src={banerImage}
                alt="Default banner"
              />
            )}
            <div className="mt-2">
              <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 active:scale-95 transition">
                📁 <span>Upload Image</span>
                <input
                  onChange={(e) => handleFileChange(e, "profileBanner")}
                  id="file-input"
                  type="file"
                  className="hidden"
                />
              </label>
            </div>
          </div>
          {/* Profile pic */}
          <div className="mt-3">
            <p className="font-medium text-[16px]">Profile Picture</p>
            <p>Profile picture shows next to your videos on YouTube.</p>
            {preview.profilePic ? (
              <div className="mt-3">
                <img
                  className="w-[100px] h-[100px] rounded-full object-cover"
                  src={preview.profilePic}
                  alt="Profile preview"
                />
              </div>
            ) : (
              <FaRegUserCircle className="mt-3" size={45} />
            )}
            <div className="mt-2">
              <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 active:scale-95 transition">
                📁 <span>Upload Image</span>
                <input
                  onChange={(e) => handleFileChange(e, "profilePic")}
                  id="file-input"
                  type="file"
                  className="hidden"
                />
              </label>
            </div>
          </div>
          {/* About */}
          <div className="mt-3 ">
            <p className="font-medium text-[16px]">About</p>
          </div>
          <textarea
            value={formData.about}
            onChange={(e) =>
              setFormData({ ...formData, about: e.target.value })
            }
            className="p-2 border border-black rounded-md w-[400px] max-h-[150px]"
          ></textarea>
          <Button type="submit" className="mt-2 mb-4">
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default MyChannel;
