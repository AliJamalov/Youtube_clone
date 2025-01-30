import React from "react";
import { useAuthStore } from "../../../stores/authStore";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";

const HeaderModal = ({ isOpenModal, handleShowModal }) => {
  const { authUser, logout } = useAuthStore();

  return (
    <div className="absolute top-[25px] right-[55px] z-10">
      {isOpenModal && (
        <div className="w-[200px] h-[150px] p-3 bg-gray-300 rounded-md">
          <div className="flex items-center justify-between">
            {authUser?.profilePic ? (
              <img
                src={authUser.profilePic}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <FaRegUserCircle size={25} />
            )}
            <p className="font-medium text-[16px]">{authUser?.username}</p>
          </div>
          <Link to="/my-channel">
            <p className="font-medium text-[16px] text-blue-500 mt-3">
              View your chanel
            </p>
          </Link>
          <div
            onClick={() => {
              handleShowModal(), logout();
            }}
            className="flex items-center gap-4 mt-3 "
          >
            <IoIosLogOut className="cursor-pointer" size={25} />
            <p className="font-medium text-[16px] cursor-pointer">logout</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderModal;
