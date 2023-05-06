const mongoose = require("mongoose");
const fs = require("fs");
const Review = require("../model/reviewModel");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.join(__dirname, "../config.env"),
});

const DB = process.env.DB.replace("<password>", process.env.DB_PASSWORD);

mongoose.set("strictQuery", false);
mongoose.connect(DB, { useNewUrlParser: true }).then(() => {
  console.log("Database connection success");
});

const review = JSON.parse(fs.readFileSync(`${__dirname}/review.json`, "utf-8"));

const importDate = async () => {
  try {
    await Review.create(review);
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteDate = async () => {
  try {
    await Review.deleteMany();
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importDate();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
