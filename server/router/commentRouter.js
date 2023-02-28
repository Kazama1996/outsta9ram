const authController = require("../controller/authController");
const commentController = require("../controller/commentController");
const express = require("express");

const router = express.Router();

router.use(authController.protect);
//router.get("/:postId", commentController.getAllComment);

router
  .route("/:profileName?/:postId/:commentId?")
  .post(commentController.createComment)
  .get(commentController.getAllComment);

module.exports = router;
