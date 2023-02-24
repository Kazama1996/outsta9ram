const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.ObjectId,
  },
  postId: {
    type: mongoose.ObjectId,
  },
  content: String,
  createdAt: Date,
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
