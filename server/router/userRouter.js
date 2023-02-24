const authController = require("../controller/authController");
const express = require("express");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/test", authController.protect, authController.test);

module.exports = router;
