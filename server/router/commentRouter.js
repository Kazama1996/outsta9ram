const express = require("express");
const {
  createComment,
  getComment,
} = require("../controller/commentController");
const { protect } = require("../controller/authController");
const commentRouter = express.Router();

const testController = require("../controller/testController");

// create a comment to a post
commentRouter.post("/api/v1/comments", protect, createComment);
// get all comment of a post
commentRouter.get("/api/v1/comments/:postId", protect, getComment);

commentRouter.get("/api/vi/testFn", testController.testFn);

module.exports = commentRouter;
