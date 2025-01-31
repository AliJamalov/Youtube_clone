import React from "react";
import { NavLink } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { GoHistory } from "react-icons/go";
import { AiOutlineYoutube } from "react-icons/ai";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";

const SideBar = ({ showMiniNavbar }) => {
  return (
    <div>
      {/* Mini Sidebar */}
      {showMiniNavbar && (
        <div className="flex flex-col gap-5 w-[50px]">
          {/* Home */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "flex flex-col items-center black"
                : "flex flex-col items-center text-gray-500"
            }
          >
            <IoMdHome size={25} />
            <p className="text-[12px] mt-1 font-light">Home</p>
          </NavLink>

          {/* Shorts */}
          <NavLink
            to="/shorts"
            className={({ isActive }) =>
              isActive
                ? "flex flex-col items-center black"
                : "flex flex-col items-center text-gray-500"
            }
          >
            <SiYoutubeshorts size={25} />
            <p className="text-[12px] mt-1 font-light">Shorts</p>
          </NavLink>

          {/* Subscriptions */}
          <NavLink
            to="/subscriptions"
            className={({ isActive }) =>
              isActive
                ? "flex flex-col items-center black"
                : "flex flex-col items-center text-gray-500"
            }
          >
            <MdSubscriptions size={25} />
            <p className="text-[12px] mt-1 font-light">Subscriptions</p>
          </NavLink>

          {/* Profile */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "flex flex-col items-center black"
                : "flex flex-col items-center text-gray-500"
            }
          >
            <FaRegUserCircle size={25} />
            <p className="text-[12px] mt-1 font-light">You</p>
          </NavLink>
        </div>
      )}

      {/* Max Sidebar */}
      {!showMiniNavbar && (
        <div className="flex flex-col max-w-[200px]">
          <div className="border-b border-gray-300 pb-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "flex gap-3 items-center bg-gray-300 px-3 py-2 rounded-lg mt-2"
                  : "flex gap-3 items-center bg-white px-3 hover:bg-gray-300 py-2 rounded-lg mt-2"
              }
            >
              <IoMdHome size={25} />
              <p className="text-[14px] font-medium text-black">Home</p>
            </NavLink>
            <NavLink
              to="/shorts"
              className={({ isActive }) =>
                isActive
                  ? "flex gap-3 items-center bg-gray-300 px-3 py-2 rounded-lg mt-2"
                  : "flex gap-3 items-center bg-white px-3 hover:bg-gray-300 py-2 rounded-lg mt-2"
              }
            >
              <SiYoutubeshorts size={25} />
              <p className="text-[14px] font-medium text-black">Shorts</p>
            </NavLink>
            <NavLink
              to="/subscriptions"
              className={({ isActive }) =>
                isActive
                  ? "flex gap-3 items-center bg-gray-300 px-3 py-2 rounded-lg mt-2"
                  : "flex gap-3 items-center bg-white hover:bg-gray-300 px-3 py-2 rounded-lg mt-2"
              }
            >
              <MdSubscriptions size={25} />
              <p className="text-[14px] font-medium text-black">
                Subscriptions
              </p>
            </NavLink>
          </div>
          <div className="border-b border-gray-300 pb-2">
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive
                  ? "flex gap-3 items-center bg-gray-300 px-3 py-2 rounded-lg mt-1"
                  : "flex gap-3 items-center bg-white hover:bg-gray-300 px-3 py-2 rounded-lg mt-1"
              }
            >
              <GoHistory size={25} />
              <p className="text-[14px] font-medium text-black">History</p>
            </NavLink>
            <NavLink
              to="/your-videos"
              className={({ isActive }) =>
                isActive
                  ? "flex gap-3 items-center bg-gray-300 px-3 py-2 rounded-lg mt-1"
                  : "flex gap-3 items-center bg-white hover:bg-gray-300 px-3 py-2 rounded-lg mt-1"
              }
            >
              <AiOutlineYoutube size={25} />
              <p className="text-[14px] font-medium text-black">Your videos</p>
            </NavLink>
            <NavLink
              to="/your-videos"
              className={({ isActive }) =>
                isActive
                  ? "flex gap-3 items-center bg-gray-300 px-3 py-2 rounded-lg mt-1"
                  : "flex gap-3 items-center bg-white hover:bg-gray-300 px-3 py-2 rounded-lg mt-1"
              }
            >
              <MdOutlineWatchLater size={25} />
              <p className="text-[14px] font-medium text-black">Watch later</p>
            </NavLink>
            <NavLink
              to="/watch-later"
              className={({ isActive }) =>
                isActive
                  ? "flex gap-3 items-center bg-gray-300 px-3 py-2 rounded-lg mt-1"
                  : "flex gap-3 items-center bg-white hover:bg-gray-300 px-3 py-2 rounded-lg mt-1"
              }
            >
              <AiOutlineLike size={25} />
              <p className="text-[14px] font-medium text-black">Liked videos</p>
            </NavLink>
          </div>

          {/* Subscriptions */}
          <div className="mt-3">
            <p className="text-[16px] font-medium">Subscriptions</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
