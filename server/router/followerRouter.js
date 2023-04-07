const express = require("express");
const { protect } = require("../controller/authController");
const {
  followUser,
  unfollowUser,
  getFollower,
  getFollowing,
} = require("../controller/followerController");
const followerRouter = express.Router();
// follow/unfollow a user.
followerRouter.post("/api/v1/followers/:profileName", protect, followUser);
followerRouter.delete("/api/v1/followers/:profileName", protect, unfollowUser);
// get follower and following list of a user.
followerRouter.get(
  "/api/v1/followers/:profileName/:pageNum",
  protect,
  getFollower
);
followerRouter.get(
  "/api/v1/following/:profileName/:pageNum",
  protect,
  getFollowing
);
// check the user is already be followed.

module.exports = followerRouter;
