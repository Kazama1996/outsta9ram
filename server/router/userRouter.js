const express = require("express");
const {
  signup,
  login,
  protect,
  result,
  forgotPassword,
  redirectPasswordReset,
  resetPassword,
  updatePassword,
  logout,
} = require("../controller/authController");
const {
  getUserProfile,
  getAllUser,
  updateMe,
  getReview,
  findUser,
} = require("../controller/userController");

const userRouter = express.Router();

// auth
userRouter.post("/api/v1/signup", signup);
userRouter.post("/api/v1/login", login);
userRouter.get("/api/v1/logout", protect, logout);
userRouter.get("/api/v1/route-protection", protect, result);
userRouter.post("/api/v1/forgot-password", forgotPassword);
userRouter.get("/api/v1/redirect-reset-password/:token", redirectPasswordReset);
userRouter.patch("/api/v1/reset-password", resetPassword);
userRouter.patch("/api/v1/update-password", protect, updatePassword);
// profile
userRouter.get("/api/v1/profile:/profileName", protect, getUserProfile);
userRouter.patch("/api/v1/update-profile", protect, updateMe);
userRouter.get("/api/v1/users/:profileName", protect, findUser);
// dev-test
userRouter.get("/api/users", getAllUser);
userRouter.get("/api/review/:page", protect, getReview);

module.exports = userRouter;
