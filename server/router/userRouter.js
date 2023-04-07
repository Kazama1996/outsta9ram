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
userRouter.post("/api/v1/auth/signup", signup);
userRouter.post("/api/v1/auth/login", login);
userRouter.get("/api/v1/auth/logout", protect, logout);
userRouter.get("/api/v1/auth/route-protection", protect, result);
userRouter.post("/api/v1/auth/forgot-password", forgotPassword);
userRouter.get(
  "/api/v1/auth/redirect-reset-password/:token",
  redirectPasswordReset
);
userRouter.patch("/api/v1/auth/reset-password", resetPassword);
// profile
userRouter.get("/api/v1/profiles/:profileName", protect, getUserProfile);
userRouter.patch("/api/v1/profiles", protect, updateMe);
userRouter.patch("/api/v1/profiles/update-password", protect, updatePassword);
// user
userRouter.get("/api/v1/users/:profileName", protect, findUser);

// dev-test
userRouter.get("/api/users", getAllUser);
userRouter.get("/api/review/:page", protect, getReview);

module.exports = userRouter;
