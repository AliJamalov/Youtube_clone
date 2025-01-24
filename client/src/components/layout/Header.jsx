import React from "react";
import { FaYoutube } from "react-icons/fa6";
import { FaBell } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import Container from "../common/Container";
import { GiHamburgerMenu } from "react-icons/gi";
import SearchInput from "../common/SearchInput";
import { FaPlus } from "react-icons/fa";
import { useAuthStore } from "../../../stores/authStore";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  const { authUser } = useAuthStore();
  return (
    <header>
      <Container>
        {/* For Mobile */}
        <div className="py-2 flex justify-between items-center sm:hidden">
          <div className="flex items-center gap-2">
            <FaYoutube size={25} className="text-red-700" />
            <p className="text-[18px] font-medium">Youtube</p>
          </div>
          <div className="flex items-center gap-4">
            <FaBell size={25} />
            <IoIosSearch size={25} />
          </div>
        </div>

        {/* For Desktops & Tablets */}
        <div className=" hidden sm:flex py-2 justify-between items-center">
          <div className="flex items-center gap-6">
            <GiHamburgerMenu size={25} />
            <div className="flex items-center gap-2">
              <FaYoutube size={35} className="text-red-700" />
              <p className="text-[22px] font-medium">Youtube</p>
            </div>
          </div>
          <div>
            <SearchInput />
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 bg-gray-700 rounded-2xl p-2 text-white">
                <FaPlus />
                Create
              </button>
              <FaBell size={25} />
            </div>
            {authUser?.profilePic ? (
              <img
                src={authUser.profilePic}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <FaRegUserCircle size={30} />
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
