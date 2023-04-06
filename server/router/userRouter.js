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
  followUser,
  unfollowUser,
  updateMe,
  getFollower,
  getFollowing,
  getReview,
  isAlreadyFollowed,
} = require("../controller/userController");

const userRouter = express.Router();

// auth
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/logout", protect, logout);
userRouter.get("/api/protectRoute", protect, result);
userRouter.post("/api/forgotPassword", forgotPassword);
userRouter.get("/api/redirectPasswordReset/:token", redirectPasswordReset);
userRouter.patch("/api/passwordReset", resetPassword);
userRouter.patch("/api/updatePassword", protect, updatePassword);
// profile
userRouter.get("/api/:profileName", protect, getUserProfile);
userRouter.patch("/api/updateMe", protect, updateMe);
// follower
userRouter.post("/api/followers/:profileName", protect, followUser);
userRouter.delete("/api/followers/:profileName", protect, unfollowUser);
userRouter.get("/api/followers/:profileName/:page", protect, getFollower);
userRouter.get("/api/following/:profileName/:page", protect, getFollowing);
userRouter.get("/api/followers/:profileName", protect, isAlreadyFollowed);
// dev-test
userRouter.get("/api/users", getAllUser);
userRouter.get("/api/review/:page", protect, getReview);

module.exports = userRouter;
