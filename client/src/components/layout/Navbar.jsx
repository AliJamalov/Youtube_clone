import React from "react";
import { FaPlus } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { MdSubscriptions } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { FaRegUserCircle } from "react-icons/fa";
import Container from "../common/Container";
import { useAuthStore } from "../../../stores/authStore";

const Navbar = () => {
  const { authUser } = useAuthStore();

  return (
    <footer className="absolute bottom-0 py-2 w-full bg-gray-200 sm:hidden">
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex justify-center flex-col items-center">
            <IoMdHome size={25} />
            <p className="text-[14px] font-medium">Home</p>
          </div>
          <div className="flex justify-center flex-col items-center">
            <SiYoutubeshorts size={25} />
            <p className="text-[14px] font-medium">Shorts</p>
          </div>
          <div className="flex justify-center flex-col items-center">
            <button className="bg-gray-400 rounded-full p-4">
              <FaPlus size={20} />
            </button>
          </div>
          <div className="flex justify-center flex-col items-center">
            <MdSubscriptions size={25} />
            <p className="text-[14px] font-medium">Subscriptions</p>
          </div>
          <div className="flex justify-center flex-col items-center">
            {authUser?.profilePic ? (
              <img
                src={authUser.profilePic}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <FaRegUserCircle size={25} />
            )}
            <p className="text-[14px] font-medium">You</p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Navbar;
