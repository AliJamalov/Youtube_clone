import express from "express";
import {
  createVideo,
  getVideos,
  getVideoById,
  deleteVideo,
  updateVideo,
  getVideosByUser,
} from "../controllers/video.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createVideo);
router.get("/", getVideos);
router.get("/byUser", protectRoute, getVideosByUser);
router.get("/:id", getVideoById);
router.delete("/:id", deleteVideo);
router.patch("/:id", updateVideo);

export default router;
