import { Post } from "../model/postModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import { Like } from "../model/likeModel.js";
import { Comment } from "../model/commentModel.js";
import { User } from "../model/userModel.js";
import { AppError } from "../utils/appError.js";
import mongoose, { Mongoose } from "mongoose";
export const createPost = catchAsync(async (req, res, next) => {
  req.body.createdAt = Date.now();
  req.body.userId = req.user.id;
  const newPost = await Post.create(req.body);
  res.status(200).send(newPost);
});

export const likePost = catchAsync(async (req, res, next) => {
  const check = await Like.findOne({
    userId: req.user.id,
    postId: req.params.postId,
  });
  if (check) {
    return next(new AppError("You already give like to this post", 401));
  }
  const newLike = await Like.create({
    userId: req.user.id,
    postId: req.params.postId,
  });
  res.status(200).send("you like a post");
});

export const cancelLikePost = catchAsync(async (req, res, next) => {
  const targetLike = await Like.findOneAndDelete({
    postId: req.params.postId,
    userId: req.user.id,
  });
  res.status(200).send("you cancel like this post");
});

export const createComment = catchAsync(async (req, res, next) => {
  const newComment = await Comment.create({
    userId: req.user.id,
    postId: req.params.postId,
    content: req.body.content,
    createdAt: Date.now(),
  });
  res.status(200).send("you comment a post");
});

export const getPostAttribute = async (req, res, next) => {
  const postAttribute = await Post.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(req.params.postId) },
    },
    {
      $lookup: {
        from: "comments",
        let: { postId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$$postId", "$postId"] } } },
          {
            $lookup: {
              from: "users",
              let: { userId: "$userId" },
              pipeline: [
                { $match: { $expr: { $eq: ["$$userId", "$_id"] } } },
                { $project: { profileName: 1, avatar: 1, _id: 0 } },
              ],
              as: "User",
            },
          },
          {
            $addFields: {
              userName: { $arrayElemAt: ["$User.profileName", 0] },
            },
          },
          {
            $sort: { createdAt: -1 },
          },
          {
            $project: { _id: 0, userName: 1, content: 1, createdAt: 1 },
          },
        ],
        as: "Comments",
      },
    },
    {
      $lookup: {
        from: "likes",
        let: { postId: "$_id" },
        pipeline: [{ $match: { $expr: { $eq: ["$$postId", "$postId"] } } }],
        as: "Likes",
      },
    },
    {
      $addFields: {
        likeQuantity: { $size: ["$Likes"] },
        commentQuantity: { $size: ["$Comments"] },
      },
    },
    {
      $project: { _id: 0, __v: 0, userId: 0, Likes: 0 },
    },
  ]);
  res.status(200).send(postAttribute);
};

// for testing
export const getAllPostByUser = async (req, res, next) => {
  const targetUser = await User.findOne({
    profileName: req.params.profileName,
  });
  const allPostt = await Post.find({ userId: targetUser._id });
  res.status(200).send(allPostt);
};
