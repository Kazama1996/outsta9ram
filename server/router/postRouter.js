import { getPreSignUrl } from "../controller/uploadController.js";
import { protect } from "../controller/authController.js";
import {
  createPost,
  likePost,
  cancelLikePost,
} from "../controller/postController.js";
import express from "express";

const postRouter = express.Router();

postRouter.get("/api/preSignUrl", protect, getPreSignUrl);
postRouter.post("/api/post", protect, createPost);

postRouter.post("/api/like/:postId", protect, likePost);
postRouter.delete("/api/like/:postId", protect, cancelLikePost);

export { postRouter };
