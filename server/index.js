import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userRouter } from "./router/userRouter.js";
import { errorHandler } from "./utils/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config({
  path: "./config.env",
});

const DB = process.env.DB.replace("<password>", process.env.DB_PASSWORD);
const app = express();
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

mongoose.connect(DB).then(
  () => {
    console.log("Database connection success");
  },
  (err) => {
    console.log("Database connection fail Error:", err);
  }
);
app.use(express.json());
app.use(userRouter);
app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`listen to port ${process.env.PORT}`);
});
