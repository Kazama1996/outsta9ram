const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  index: {
    type: Number,
  },
  content: {
    type: String,
  },
});

const Review = mongoose.model("reviews", reviewSchema);

module.exports = Review;
