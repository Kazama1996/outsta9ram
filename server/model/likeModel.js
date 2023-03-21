import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
  },
  postId: {
    type: mongoose.Types.ObjectId,
  },
});

const Like = mongoose.model("likes", likeSchema);

export { Like };
