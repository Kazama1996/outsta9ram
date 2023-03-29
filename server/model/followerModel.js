const mongoose = require("mongoose");

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

module.exports = Followers;
