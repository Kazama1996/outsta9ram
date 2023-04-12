const express = require("express");
const { getSearchHistory, pushIntoQueue } = require("../cache/searchCache");
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
  saveProfile,
  getProfile,
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
userRouter.get("/api/v1/search-history", protect, getSearchHistory);
userRouter.post("/api/v1/search-history", protect, pushIntoQueue);
// dev-test
userRouter.get("/api/users", getAllUser);
userRouter.get("/api/review/:page", protect, getReview);

userRouter.post("/api/test/profile/:profileName", protect, saveProfile);
userRouter.get("/api/test/profile/:profileName", protect, getProfile);
module.exports = userRouter;
