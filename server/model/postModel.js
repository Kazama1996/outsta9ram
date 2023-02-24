const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.ObjectId,
    //required: true,
  },
  content: {
    type: String,
  },
  photoId: {
    type: mongoose.ObjectId,
    //required: true,
  },
  createdAt: Date,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
