import React from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { useAuthStore } from "../../../stores/authStore";

const Comments = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="p-2 bg-gray-300 rounded-md my-2">
      <div className="w-full flex items-center gap-4">
        <img
          className="rounded-full h-[40px] w-[40px] object-cover"
          src={authUser?.profilePic}
        />
        <input
          className="border w-full border-white rounded-md p-2"
          type="text"
          placeholder="add your comment"
        />
        <RiSendPlane2Fill color="blue" size={30} />
      </div>
    </div>
  );
};

export default Comments;
