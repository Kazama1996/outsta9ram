const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Types.ObjectId,
  },
  userId: {
    type: mongoose.Types.ObjectId,
  },
  createdAt: {
    type: Date,
  },
  content: {
    type: String,
  },
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
