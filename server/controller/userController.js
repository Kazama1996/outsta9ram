const User = require("../model/userModel");
const Comment = require("../model/commentModel");
const Post = require("../model/commentModel");
const Followers = require("../model/followerModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const filterObj = (obj, ...allowFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getUserProfile = async (req, res, next) => {
  const profile = await User.aggregate([
    { $match: { profileName: req.params.profileName } },
    {
      $lookup: {
        from: "posts",
        let: { userId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$$userId", "$userId"] } } },
          {
            $sort: { createdAt: -1 },
          },

          {
            $lookup: {
              from: "likes",
              let: { postId: "$_id" },
              pipeline: [
                { $match: { $expr: { $eq: ["$$postId", "$postId"] } } },
              ],
              as: "Likes",
            },
          },
          {
            $lookup: {
              from: "comments",
              let: { postId: "$_id" },
              pipeline: [
                { $match: { $expr: { $eq: ["$$postId", "$postId"] } } },
              ],
              as: "Comments",
            },
          },
          {
            $project: {
              photoPath: 1,
              LikeQuantity: { $size: "$Likes" },
              CommentQuantity: { $size: "$Comments" },
            },
          },
        ],
        as: "Posts",
      },
    },

    {
      $lookup: {
        from: "followers",
        let: { userId: "$_id" },
        pipeline: [{ $match: { $expr: { $eq: ["$$userId", "$userFrom"] } } }],
        as: "Following",
      },
    },
    {
      $lookup: {
        from: "followers",
        let: { userId: "$_id" },
        pipeline: [{ $match: { $expr: { $eq: ["$$userId", "$userTo"] } } }],
        as: "Follower",
      },
    },
    {
      $addFields: {
        PostQuantity: { $size: "$Posts" },
        FollowerQuantity: { $size: "$Follower" },
        FollowingQuantity: { $size: "$Following" },
      },
    },
    {
      $project: {
        _id: 0,
        profileName: 1,
        Posts: 1,
        PostQuantity: 1,
        FollowerQuantity: 1,
        FollowingQuantity: 1,
        signature: 1,
      },
    },
  ]);
  res.status(200).send(profile);
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

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password) {
    return next(
      new AppError(
        "This router is not for password update , Please user updateMyPassword",
        400
      )
    );
  }
  const filteredBody = filterObj(
    req.body,
    "profileName",
    "signature",
    "avatar"
  );

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).send("you update your profile");
});
// for testing
exports.getAllUser = async (req, res, next) => {
  const AllUser = await User.find();
  res.status(200).send(AllUser);
};
