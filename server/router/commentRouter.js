const authController = require("../controller/authController");
const commentController = require("../controller/commentController");
const express = require("express");

const router = express.Router();

router.use(authController.protect);
router.route("/:id").post(commentController.createComment);

module.exports = router;
