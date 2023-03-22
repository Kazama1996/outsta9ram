import mongoose from "mongoose";

const followerSchema = new mongoose.Schema({
  userFrom: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  userTo: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Followers = mongoose.model("followers", followerSchema);

export { Followers };
