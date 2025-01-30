import React, { useState } from "react";
import { FaYoutube } from "react-icons/fa6";
import { GoBell } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import Container from "../common/Container";
import { GiHamburgerMenu } from "react-icons/gi";
import SearchInput from "../common/SearchInput";
import { GoPlus } from "react-icons/go";
import { useAuthStore } from "../../../stores/authStore";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import HeaderModal from "../common/HeaderModal";

const Header = ({ handleShowNavbar }) => {
  const { authUser } = useAuthStore();
  console.log(authUser);
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleShowModal = () => {
    setIsOpenModal(!isOpenModal);
  };

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
            <GoBell size={25} />
            <IoIosSearch size={25} />
          </div>
        </div>

        {/* For Desktops & Tablets */}
        <div className=" hidden sm:flex py-2 justify-between items-center">
          <div className="flex items-center gap-6">
            <GiHamburgerMenu
              className="cursor-pointer"
              onClick={handleShowNavbar}
              size={25}
            />
            <Link className="flex items-center gap-2" to="/">
              <FaYoutube size={35} className="text-red-500" />
              <p className="text-[22px] font-medium">Youtube</p>
            </Link>
          </div>
          <div>
            <SearchInput />
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  authUser != null
                    ? navigate("/create-video")
                    : navigate("/login");
                }}
                className="flex items-center cursor-pointer gap-2 bg-black/5 rounded-2xl p-2"
              >
                <GoPlus color="black" />
                Create
              </button>
              <GoBell size={25} />
            </div>
            {authUser?.profilePic ? (
              <img
                src={authUser?.profilePic}
                onClick={handleShowModal}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover cursor-pointer"
              />
            ) : (
              <FaRegUserCircle
                className="cursor-pointer"
                onClick={() => {
                  authUser ? handleShowModal() : navigate("/login");
                }}
                size={30}
              />
            )}
          </div>
        </div>

        {/* Modal */}
        <HeaderModal
          isOpenModal={isOpenModal}
          handleShowModal={handleShowModal}
        />
      </Container>
    </header>
  );
};

export default Header;
