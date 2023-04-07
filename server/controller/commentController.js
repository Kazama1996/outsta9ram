const Comment = require("../model/commentModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const mongoose = require("mongoose");
const { formatDistance } = require("date-fns");

exports.createComment = catchAsync(async (req, res, next) => {
  const newComment = await Comment.create({
    userId: req.user.id,
    postId: req.body.postId,
    content: req.body.content,
    createdAt: Date.now(),
  });
  res.status(200).send("you comment a post");
});

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
