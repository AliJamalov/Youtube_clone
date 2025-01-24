import Video from "../models/video.model.js";
import cloudinary from "../utils/cloudinary.js";

export const createVideo = async (req, res) => {
  const { title, description, videoFile, videoImageFile, tags } = req.body;
  const userId = req.user._id;

  try {
    if (!title || !description || !videoFile || !videoImageFile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const videoUploadResponse = await cloudinary.uploader.upload_large(
      videoFile,
      {
        resource_type: "video",
        folder: "Youtube_clone/videos",
      }
    );

    const imageUploadResponse = await cloudinary.uploader.upload(
      videoImageFile,
      {
        folder: "Youtube_clone/images",
      }
    );

    const newVideo = new Video({
      title,
      description,
      videoUrl: videoUploadResponse.secure_url,
      videoImage: imageUploadResponse.secure_url,
      tags: tags || [],
      userId,
    });

    await newVideo.save();

    res.status(201).json({
      message: "Video created successfully",
      video: {
        id: newVideo._id,
        title: newVideo.title,
        description: newVideo.description,
        videoUrl: newVideo.videoUrl,
        videoImage: newVideo.videoImage,
        tags: newVideo.tags,
        createdAt: newVideo.createdAt,
      },
    });
  } catch (error) {
    console.error("Error creating video:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getVideos = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const videos = await Video.find()
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const totalVideos = await Video.countDocuments();

    res.status(200).json({
      videos,
      totalVideos,
      currentPage: Number(page),
      totalPages: Math.ceil(totalVideos / limit),
    });
  } catch (error) {
    console.error("Error fetching videos:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getVideoById = async (req, res) => {
  const { id } = req.params;
  try {
    const singleVideo = await Video.findById(id);

    if (!singleVideo) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json({ singleVideo });
  } catch (error) {
    console.error("Error fetching video:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateVideo = async (req, res) => {
  const { id } = req.params;
  const { title, description, videoImage, tags } = req.body;

  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      id,
      { title, description, videoImage, tags },
      { new: true, runValidators: true } // Опции:
      // new: true - возвращает обновлённый документ
      // runValidators: true - проверяет валидацию схемы
    );

    if (!updatedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json({
      message: "Video updated successfully",
      updatedVideo,
    });
  } catch (error) {
    console.error("Error updating video:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedVideo = await Video.findByIdAndDelete(id);

    if (!deletedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json({
      message: "Video deleted successfully",
      deletedVideo,
    });
  } catch (error) {
    console.error("Error deleting video:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
