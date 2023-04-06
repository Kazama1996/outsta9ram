const express = require("express");
const { getPreSignUrl } = require("../controller/uploadController");
const { protect } = require("../controller/authController");
const {
  createPost,
  likePost,
  cancelLikePost,
  getAllPostByUser,
  getPostAttribute,
  isLikeBefore,
} = require("../controller/postController");

const postRouter = express.Router();

// Upload post
postRouter.get("/api/preSignUrl", protect, getPreSignUrl);
postRouter.post("/api/post", protect, createPost);
// Like or cancel like a post
postRouter.post("/api/like/:postId", protect, likePost);
postRouter.delete("/api/like/:postId", protect, cancelLikePost);
postRouter.get("/api/like/:postId", protect, isLikeBefore);
// show information on the post window.
postRouter.get("/api/p/:postId", protect, getPostAttribute);
// dev-test
postRouter.get("/api/post/:profileName", protect, getAllPostByUser);

module.exports = postRouter;
