const express = require("express");
const { protect } = require("../controller/authController");
const {
  followUser,
  unfollowUser,
  getFollower,
  getFollowing,
  isAlreadyFollowed,
} = require("../controller/followerController");
const followerRouter = express.Router();
// follow/unfollow a user.
followerRouter.post("/api/followers/:profileName", protect, followUser);
followerRouter.delete("/api/followers/:profileName", protect, unfollowUser);
// get follower and following list of a user.
followerRouter.get("/api/followers/:profileName/:page", protect, getFollower);
followerRouter.get("/api/following/:profileName/:page", protect, getFollowing);
// check the user is already be followed.
followerRouter.get("/api/followers/:profileName", protect, isAlreadyFollowed);

module.exports = followerRouter;
