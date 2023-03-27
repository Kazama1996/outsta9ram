import { getPreSignUrl } from "../controller/uploadController.js";
import { protect } from "../controller/authController.js";
import {
  createPost,
  likePost,
  cancelLikePost,
  getAllPostByUser,
  createComment,
  getPostAttribute,
  getComment,
  isLikeBefore,
} from "../controller/postController.js";
import express from "express";

const postRouter = express.Router();

postRouter.get("/api/preSignUrl", protect, getPreSignUrl);
postRouter.post("/api/post", protect, createPost);
postRouter.post("/api/like/:postId", protect, likePost);
postRouter.delete("/api/like/:postId", protect, cancelLikePost);
postRouter.get("/api/post/:profileName", protect, getAllPostByUser);
postRouter.get("/api/like/:postId", protect, isLikeBefore);
postRouter.post("/api/comment/:postId", protect, createComment);
postRouter.get("/api/p/:postId", protect, getPostAttribute);
postRouter.get("/api/comment/:postId", protect, getComment);
export { postRouter };
