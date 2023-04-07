const Followers = require("../model/followerModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const User = require("../model/userModel");
const mongoose = require("mongoose");

exports.getFollowing = async (req, res, next) => {
  const targetUser = await User.findOne({
    profileName: req.params.profileName,
  });
  const followingList = await Followers.aggregate([
    { $match: { userFrom: new mongoose.Types.ObjectId(targetUser._id) } },
    {
      $lookup: {
        from: "users",
        let: { userTo: "$userTo" },
        pipeline: [{ $match: { $expr: { $eq: ["$$userTo", "$_id"] } } }],
        as: "Users",
      },
    },
    {
      $addFields: {
        avatar: { $arrayElemAt: ["$Users.avatar", 0] },
        profileName: { $arrayElemAt: ["$Users.profileName", 0] },
      },
    },
    { $project: { avatar: 1, profileName: 1, _id: 0 } },
    { $skip: 50 * (req.params.pageNum - 1) },
    { $limit: 50 },
  ]);
  res.status(200).send(followingList);
};

exports.getFollower = async (req, res, next) => {
  const targetUser = await User.findOne({
    profileName: req.params.profileName,
  });

  const followerList = await Followers.aggregate([
    { $match: { userTo: new mongoose.Types.ObjectId(targetUser._id) } },
    {
      $lookup: {
        from: "users",
        let: { userFrom: "$userFrom" },
        pipeline: [{ $match: { $expr: { $eq: ["$$userFrom", "$_id"] } } }],
        as: "Users",
      },
    },
    {
      $addFields: {
        avatar: { $arrayElemAt: ["$Users.avatar", 0] },
        profileName: { $arrayElemAt: ["$Users.profileName", 0] },
      },
    },
    { $project: { avatar: 1, profileName: 1, _id: 0 } },
    { $skip: 50 * (req.params.pageNum - 1) },
    { $limit: 50 },
  ]);
  res.status(200).send(followerList);
};
exports.unfollowUser = async (req, res, next) => {
  const targetUser = await User.findOne({
    profileName: req.params.profileName,
  });
  if (!targetUser) {
    return next(
      new AppError("Could not find user with this profile Name!", 401)
    );
  }
  await Followers.findOneAndDelete({
    $and: [{ userFrom: req.user.id }, { userTo: targetUser._id }],
  });
  res.status(200).send("you unfollow a user");
};
exports.followUser = catchAsync(async (req, res, next) => {
  const targetUser = await User.findOne({
    profileName: req.params.profileName,
  });
  if (!targetUser) {
    return next(
      new AppError("Could not find user with this profile Name!", 401)
    );
  }
  const isFollow = await Followers.findOne({
    userFrom: req.user.id,
    userTo: targetUser._id,
  });
  if (isFollow) {
    return next(new AppError("You are already follow this user", 401));
  }
  const follow = await Followers.create({
    userFrom: req.user.id,
    userTo: targetUser._id,
  });
  res.status(200).send("You follow a user");
});
