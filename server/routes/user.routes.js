import express from "express";
import { updateUserProfile } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.patch("/", protectRoute, updateUserProfile);

export default router;
