import express from "express";
import { getComments, addComment } from "../controllers/comment.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, addComment);
router.get("/:id", getComments);

export default router;
