import express from "express";
import {
  signup,
  login,
  protect,
  result,
} from "../controller/authController.js";
const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/protect", protect, result);
export { userRouter };
