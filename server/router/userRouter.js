import express from "express";
import {
  signup,
  login,
  protect,
  result,
} from "../controller/authController.js";
import { getUserProfile } from "../controller/userController.js";
const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/protect", protect, result);
userRouter.get("/api/protect", protect, result);
userRouter.get("/api/:profileName", protect, getUserProfile);

export { userRouter };
