import express from "express";
import {
  signup,
  login,
  protect,
  result,
} from "../controller/authController.js";
import {
  getUserProfile,
  getAllUser,
  followUser,
  unfollowUser,
} from "../controller/userController.js";
const userRouter = express.Router();

// auth
userRouter.post("/signup", signup);
userRouter.post("/login", login);
// profile
userRouter.get("/api/:profileName", protect, getUserProfile);

// follower
userRouter.post("/api/followers/:profileName", protect, followUser);
userRouter.delete("/api/followers/:profileName", protect, unfollowUser);

// dev-test
userRouter.get("/api/users", getAllUser);

export { userRouter };
