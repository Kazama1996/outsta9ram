import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  photoPath: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  content: {
    type: String,
  },
});

const Post = mongoose.model("Post", postSchema);

export { Post };
