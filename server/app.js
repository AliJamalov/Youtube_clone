import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Routes
import authRouter from "./routes/auth.routes.js";
import videoRouter from "./routes/video.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/videos", videoRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.log(err);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
