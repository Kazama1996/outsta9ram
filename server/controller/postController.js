const Post = require("../model/postModel");
const Like = require("../model/likeModel");
const User = require("../model/userModel");
const AppError = require("../utils/appError");
const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");
const { formatDistance } = require("date-fns");

exports.createPost = catchAsync(async (req, res, next) => {
  req.body.createdAt = Date.now();
  req.body.userId = req.user.id;
  const path = req.body.photoPath;
  req.body.photoPath = process.env.AWS_S3BUCKET_URL + path;
  const newPost = await Post.create(req.body);
  res.status(200).send(newPost);
});

exports.likePost = catchAsync(async (req, res, next) => {
  const check = await Like.findOne({
    userId: req.user.id,
    postId: req.body.postId,
  });
  if (check) {
    return next(new AppError("You already give like to this post", 401));
  }
  const newLike = await Like.create({
    userId: req.user.id,
    postId: req.body.postId,
  });
  res.status(200).send("you like a post");
});

exports.cancelLikePost = catchAsync(async (req, res, next) => {
  const targetLike = await Like.findOneAndDelete({
    postId: req.body.postId,
    userId: req.user.id,
  });
  res.status(200).send("you cancel like this post");
});

exports.getPostAttribute = async (req, res, next) => {
  const postAttribute = await Post.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(req.params.postId) },
    },
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
        author: { $arrayElemAt: ["$User.profileName", 0] },
        avatar: { $arrayElemAt: ["$User.avatar", 0] },
        isLiked: {
          $in: [new mongoose.Types.ObjectId(req.user.id), "$Likes.userId"],
        },
      },
    },
    {
      $project: {
        _id: 0,
        __v: 0,
        userId: 0,
        Likes: 0,
        User: 0,
      },
    },
  ]);

  postAttribute[0].createdAt = formatDistance(
    postAttribute[0].createdAt,
    Date.now(),
    { addSuffix: true }
  );

  res.status(200).send(postAttribute);
};

// for testing
exports.getAllPostByUser = async (req, res, next) => {
  const targetUser = await User.findOne({
    profileName: req.params.profileName,
  });
  const allPostt = await Post.find({ userId: targetUser._id });
  res.status(200).send(allPostt);
};
