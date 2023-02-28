const authController = require("../controller/authController");
const userController = require("../controller/userController");
const express = require("express");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/test", authController.protect, authController.test);

router.get("/users", userController.getAllUser);

module.exports = router;
