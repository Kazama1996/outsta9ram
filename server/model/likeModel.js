const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  userId: mongoose.ObjectId,
  postId: mongoose.ObjectId,
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
