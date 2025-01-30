import User from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";

export const updateUserProfile = async (req, res) => {
  const { profilePic, profileBanner, about } = req.body;
  const userId = req.user._id;

  try {
    const updateData = { about };

    if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic, {
        folder: "Youtube_clone/images",
      });
      updateData.profilePic = uploadResponse.secure_url;
    }

    if (profileBanner) {
      const uploadResponse = await cloudinary.uploader.upload(profileBanner, {
        folder: "Youtube_clone/images",
      });
      updateData.profileBanner = uploadResponse.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      updatedUser,
    });
    console.log(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
