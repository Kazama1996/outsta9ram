import { User } from "../model/userModel.js";
import { Like } from "../model/likeModel.js";
import { Comment } from "../model/commentModel.js";
import { Post } from "../model/postModel.js";
import { Followers } from "../model/followerModel.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";
export const getUserProfile = async (req, res, next) => {
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

export const followUser = catchAsync(async (req, res, next) => {
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

export const unfollowUser = async (req, res, next) => {
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

// for testing
export const getAllUser = async (req, res, next) => {
  const AllUser = await User.find();
  res.status(200).send(AllUser);
};
