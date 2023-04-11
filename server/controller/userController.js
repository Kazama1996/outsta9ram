const User = require("../model/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Review = require("../model/reviewModel");
const { default: mongoose } = require("mongoose");

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
        isFollowed: {
          $in: [new mongoose.Types.ObjectId(req.user.id), "$Follower.userFrom"],
        },
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
        avatar: 1,
        isFollowed: 1,
      },
    },
  ]);
  res.status(200).send(profile);
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
  if (filteredBody.avatar) {
    const path = filteredBody.avatar;
    filteredBody.avatar = process.env.AWS_S3BUCKET_URL + path;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  updatedUser.password = undefined;
  updatedUser.passwordResetExpire = undefined;
  updatedUser.passwordResetToken = undefined;

  res.status(200).send(updatedUser);
});

exports.findUser = async (req, res, next) => {
  const userList = await User.find({
    profileName: { $regex: `^${req.params.profileName}\w*` },
  })
    .limit(10)
    .select("-password -__v -_id -email -fullName -signature");
  if (!userList) {
    res.status(200).send([]);
  }
  res.status(200).send(userList);
};

// for testing
exports.getAllUser = async (req, res, next) => {
  const AllUser = await User.find();
  res.status(200).send(AllUser);
};
exports.getReview = async (req, res, next) => {
  const reviewList = await Review.aggregate([
    { $sort: { index: -1 } },
    { $skip: 3 * (req.params.page - 1) },
    { $limit: 3 },
  ]);
  res.status(200).send(reviewList);
};
