const Post = require("../model/postModel");
const Like = require("../model/likeModel");
const Comment = require("../model/commentModel");
const User = require("../model/userModel");
const AppError = require("../utils/appError");
const { formatDistance } = require("date-fns");
const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");

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

exports.cancelLikePost = catchAsync(async (req, res, next) => {
  const targetLike = await Like.findOneAndDelete({
    postId: req.params.postId,
    userId: req.user.id,
  });
  res.status(200).send("you cancel like this post");
});

exports.createComment = catchAsync(async (req, res, next) => {
  const newComment = await Comment.create({
    userId: req.user.id,
    postId: req.params.postId,
    content: req.body.content,
    createdAt: Date.now(),
  });
  res.status(200).send("you comment a post");
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

        //commentQuantity: { $size: ["$Comments"] },
      },
    },
    {
      $project: { _id: 0, __v: 0, userId: 0, Likes: 0, User: 0 },
    },
  ]);

  postAttribute[0].createdAt = formatDistance(
    postAttribute[0].createdAt,
    Date.now(),
    { addSuffix: true }
  );

  res.status(200).send(postAttribute);
};

exports.getComment = async (req, res, next) => {
  const comment = await Comment.aggregate([
    { $match: { postId: new mongoose.Types.ObjectId(req.params.postId) } },
    {
      $sort: { createdAt: -1 },
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
      $addFields: {
        profileName: { $arrayElemAt: ["$User.profileName", 0] },
        avatar: { $arrayElemAt: ["$User.avatar", 0] },
      },
    },
    {
      $project: { createdAt: 1, content: 1, _id: 0, avatar: 1, profileName: 1 },
    },
  ]);
  comment.map((el) => {
    el.createdAt = formatDistance(el.createdAt, Date.now(), {
      addSuffix: true,
    });
  });
  res.status(200).send(comment);
};

exports.isLikeBefore = async (req, res, next) => {
  const targetLike = await Like.findOne({
    postId: new mongoose.Types.ObjectId(req.params.postId),
    userId: req.user.id,
  });
  if (targetLike) {
    res.status(200).send(true);
  } else {
    res.status(200).send(false);
  }
};

// for testing
exports.getAllPostByUser = async (req, res, next) => {
  const targetUser = await User.findOne({
    profileName: req.params.profileName,
  });
  const allPostt = await Post.find({ userId: targetUser._id });
  res.status(200).send(allPostt);
};
