const express = require("express");
const postController = require("../controller/postController");
const authController = require("../controller/authController");
const commentController = require("../controller/commentController");
const router = express.Router();

router.use(authController.protect);
//Create a post
router.get("/:profileName", postController.getAllPost);
router.post("/p/:postId", commentController.createComment);
router.get("/p/:postId", commentController.getAllComment);
router.post(
  "/:profileName",
  authController.isolated,
  postController.uploadPostPhoto,
  postController.createPost
);

router.patch("/:postId", postController.updatePost);
router.delete("/:postId", postController.deletePost);
router.post("/p/:postId/like", postController.likePost);
router.delete("/p/:postid/like", postController.cancelLike);

// router
//   .route("/:profileName/:postId?")
//   .all(authController.isolated)
//   .post(postController.uploadPostPhoto, postController.createPost)
//   .patch(postController.updatePost)
//   .delete(postController.deletePost);

// router.route("/:profileName/:postId/like", postController.likePost);
// router.route("/:profileName/:postId/cancelLike", postController.cancelLike);

//router.post("/test", postController.uploadPostPhoto, postController.test);

module.exports = router;
