import Comment from "../models/comment.model.js";

export const addComment = async (req, res) => {
  const { text, videoId } = req.body;
  const userId = req.user?._id;
  try {
    if (!text || !videoId)
      return res.status(400).json({ message: "text and videoId is required" });

    const newComment = new Comment({
      text,
      userId,
      videoId,
    });

    await newComment.save();

    res.status(201).json({
      message: "Comment created successfuly!",
      comment: {
        _id: newComment._id,
        text: newComment.text,
        userId: newComment.userId,
        videoId: newComment.videoId,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getComments = async (req, res) => {
  const { id: videoId } = req.params;

  try {
    if (!videoId) {
      return res.status(400).json({ message: "Video ID is required" });
    }

    const comments = await Comment.find({ videoId })
      .populate("userId", "profilePic username")
      .sort({ createdAt: -1 });

    if (!comments.length) {
      return res.status(200).json({ comments: [] });
    }

    res.status(200).json({ comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
