const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  photoId: {
    type: mongoose.Schema.ObjectId,
    ref: "MetaData",
    //required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    //required: true,
  },
  content: {
    type: String,
  },
  createdAt: Date,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
