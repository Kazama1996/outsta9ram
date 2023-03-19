import { getPreSignUrl } from "../controller/uploadController.js";
import { protect } from "../controller/authController.js";
import express from "express";

const postRouter = express.Router();

postRouter.get("/api/upload", protect, getPreSignUrl);

export { postRouter };
