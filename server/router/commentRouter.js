const express = require("express");
const {
  createComment,
  getComment,
} = require("../controller/commentController");
const { protect } = require("../controller/authController");
const commentRouter = express.Router();

// create a comment to a post
commentRouter.post("/api/v1/comments", protect, createComment);
// get all comment of a post
commentRouter.get("/api/v1/comments/:postId", protect, getComment);

module.exports = commentRouter;
