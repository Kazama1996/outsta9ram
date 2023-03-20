import { getPreSignUrl } from "../controller/uploadController.js";
import { protect } from "../controller/authController.js";
import { createPost } from "../controller/postController.js";
import express from "express";

const postRouter = express.Router();

postRouter.get("/api/upload", protect, getPreSignUrl);
postRouter.get("/api/preSignUrl", protect, getPreSignUrl);

postRouter.put("/api/post", protect, createPost);

export { postRouter };
