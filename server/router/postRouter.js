import { getPreSignUrl } from "../controller/uploadController.js";
import { protect } from "../controller/authController.js";
import {
  createPost,
  likePost,
  cancelLikePost,
  getAllPostByUser,
  createComment,
} from "../controller/postController.js";
import express from "express";

const postRouter = express.Router();

postRouter.get("/api/preSignUrl", protect, getPreSignUrl);
postRouter.post("/api/post", protect, createPost);
postRouter.post("/api/like/:postId", protect, likePost);
postRouter.delete("/api/like/:postId", protect, cancelLikePost);
postRouter.get("/api/post/:profileName", protect, getAllPostByUser);
postRouter.post("/api/comment/:postId", protect, createComment);
export { postRouter };
