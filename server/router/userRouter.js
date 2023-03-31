const express = require("express");
const {
  signup,
  login,
  protect,
  result,
  forgotPassword,
  redirectPasswordReset,
  resetPassword,
} = require("../controller/authController");
const {
  getUserProfile,
  getAllUser,
  followUser,
  unfollowUser,
  updateMe,
} = require("../controller/userController");

const userRouter = express.Router();

// auth
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/api/protectRoute", protect, result);
userRouter.post("/api/forgotPassword", forgotPassword);
userRouter.get("/api/redirectPasswordReset/:token", redirectPasswordReset);
userRouter.post("/api/passwordReset", resetPassword);
// profile
userRouter.get("/api/:profileName", protect, getUserProfile);
userRouter.patch("/api/updateMe", protect, updateMe);
// follower
userRouter.post("/api/followers/:profileName", protect, followUser);
userRouter.delete("/api/followers/:profileName", protect, unfollowUser);

// dev-test
userRouter.get("/api/users", getAllUser);

module.exports = userRouter;
