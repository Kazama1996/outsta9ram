const express = require("express");
const postController = require("../controller/postController");
const authController = require("../controller/authController");
const router = express.Router();

router.use(authController.protect);
router
  .route("/")
  .post(postController.uploadPostPhoto, postController.createPost);

//router.post("/test", postController.uploadPostPhoto, postController.test);

module.exports = router;
