const express = require("express");
const mongoose = require("mongoose");
const postRouter = require("./router/postRouter");
const userRouter = require("./router/userRouter");
const commentRouter = require("./router/commentRouter");
const followerRouter = require("./router/followerRouter");
const errorHandler = require("./utils/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.join(__dirname, "/config.env"),
});
require("./cache/profileCache");

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
app.use(postRouter);
app.use(userRouter);
app.use(commentRouter);
app.use(followerRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`env is ${process.env.ENV}`);
  console.log(`listen to port ${process.env.PORT}`);
});

module.exports = app;
