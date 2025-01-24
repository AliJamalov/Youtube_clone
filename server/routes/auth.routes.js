import express from "express";
import {
  register,
  login,
  logout,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/log-out", logout);

router.get("/check-auth", protectRoute, checkAuth);

export default router;
