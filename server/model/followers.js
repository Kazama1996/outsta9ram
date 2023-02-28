const mongoose = require("mongoose");

const followerSchema = new mongoose.Schema({
  userFrom: {
    type: mongoose.ObjectId,
    ref: "User",
  },
  userTo: {
    type: mongoose.ObjectId,
    ref: "User",
  },
});

const Followers = mongoose.model("Followers", followerSchema);

module.exports = Followers;
