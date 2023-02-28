const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const userRouter = require("./router/userRouter");
const cors = require("cors");
const errorHandler = require("./utils/errorHandler");
const postRouter = require("./router/postRouter");
const commentRouter = require("./router/commentRouter");
app.use(cors({ credentials: true, origin: true }));
dotenv.config({
  path: "./config.env",
});

const DB = process.env.DB.replace("<PASSWORD>", process.env.DB_PASSWORD);
mongoose.set("strictQuery", false);
mongoose.connect(DB).then(
  () => {
    console.log("success connect database");
  },
  (err) => {
    console.log("Fail to connect DB", err.message);
  }
);

app.use(cookieParser());

app.use(express.json());
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);

app.use(errorHandler);

module.exports = app;
