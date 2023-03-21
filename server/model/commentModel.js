import mongoose from "mongoose";

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
    type: Date,
  },
});

const Comment = mongoose.model("comment", commentSchema);

export { Comment };
