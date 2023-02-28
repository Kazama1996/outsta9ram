const express = require("express");
const postController = require("../controller/postController");
const authController = require("../controller/authController");
const router = express.Router();

router.use(authController.protect);
//Create a post
router.route("/:profileName").get(postController.getAllPost);

router
  .route("/:profileName/:postId?")
  .all(authController.isolated)
  .post(postController.uploadPostPhoto, postController.createPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

router.route("/:profileName/:postId/like", postController.likePost);
router.route("/:profileName/:postId/cancelLike", postController.cancelLike);

//router.post("/test", postController.uploadPostPhoto, postController.test);

module.exports = router;
