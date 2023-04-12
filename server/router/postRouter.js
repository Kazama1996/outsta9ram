const express = require("express");
const { getPreSignUrl } = require("../controller/uploadController");
const { protect } = require("../controller/authController");
const {
  createPost,
  likePost,
  cancelLikePost,
  getPostAttribute,
  creatTest,
} = require("../controller/postController");

const postRouter = express.Router();

// Upload post
postRouter.get("/api/v1/posts/presign-url", protect, getPreSignUrl);
postRouter.post("/api/v1/posts", protect, createPost);
// Like or cancel like a post
postRouter.post("/api/v1/likes/:postId", protect, likePost);
postRouter.delete("/api/v1/likes/:postId", protect, cancelLikePost);
// show information on the post window.
postRouter.get("/api/v1/posts/:postId", protect, getPostAttribute);

// for dev-test
postRouter.post("/api/v1/test/create", protect, creatTest);

module.exports = postRouter;
