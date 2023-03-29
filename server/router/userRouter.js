const express = require("express");
const {
  signup,
  login,
  protect,
  result,
} = require("../controller/authController");
const {
  getUserProfile,
  getAllUser,
  followUser,
  unfollowUser,
} = require("../controller/userController");

const userRouter = express.Router();

// auth
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/api/protectRoute", protect, result);
userRouter.post("/api/forgotPassword", forgotPassword);
// profile
userRouter.get("/api/:profileName", protect, getUserProfile);

// follower
userRouter.post("/api/followers/:profileName", protect, followUser);
userRouter.delete("/api/followers/:profileName", protect, unfollowUser);

// dev-test
userRouter.get("/api/users", getAllUser);

module.exports = userRouter;
