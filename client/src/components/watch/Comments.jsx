import React, { useEffect, useState } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { useAuthStore } from "../../../stores/authStore";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../utils/axios";
import userAvatar from "../../assets/images/user-avatar.png";

const Comments = () => {
  const { id } = useParams();
  const { authUser } = useAuthStore();

  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setShowComments(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchVideoComments = async () => {
    if (!id) return;
    try {
      const response = await axiosInstance.get(`/comments/${id}`);
      setComments(response.data.comments);
    } catch (error) {
      console.log("Error fetching comments:", error);
      setComments([]);
    }
  };

  const handleAddComment = async () => {
    if (!text.trim()) return;
    try {
      await axiosInstance.post("/comments", { text, videoId: id });
      setText("");
      fetchVideoComments();
    } catch (error) {
      console.log("Error creating comment:", error);
    }
  };

  useEffect(() => {
    setComments([]);
    fetchVideoComments();
  }, [id]);

  return (
    <div className="my-3">
      {/* Modal for Show comments */}
      {window.innerWidth <= 768 && (
        <button
          onClick={() => setShowComments((prev) => !prev)}
          className="w-full bg-gray-200 text-center p-2 rounded-md font-semibold"
        >
          {showComments ? "Close comments" : "Show comments"}
        </button>
      )}
      {/* Input for comments */}
      {showComments && (
        <>
          <div className="p-2 bg-gray-300 rounded-md my-2">
            <div className="w-full flex items-center gap-4">
              <img
                className="rounded-full h-[40px] w-[40px] object-cover"
                src={authUser?.profilePic || userAvatar}
                alt="User avatar"
              />
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="border w-full border-white rounded-md p-2"
                type="text"
                placeholder="Add your comment"
              />
              <RiSendPlane2Fill
                className="cursor-pointer"
                onClick={handleAddComment}
                color="blue"
                size={30}
              />
            </div>
          </div>

          {/* Comments */}
          <div className="mt-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id} className="flex items-center gap-3 p-2">
                  <img
                    className="rounded-full h-[35px] w-[35px] object-cover"
                    src={comment.userId?.profilePic || userAvatar}
                    alt="User avatar"
                  />
                  <div>
                    <p className="text-sm font-semibold">
                      {comment.userId?.username}
                    </p>
                    <p className="text-sm">{comment.text}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No comments yet</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Comments;
