const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const MetaData = require("../model/metadataModel");
const User = require("../model/userModel");
const { default: mongoose } = require("mongoose");
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    req.body.createdAt = Date.now();
    req.body.userId = req.user.id;
    if (Model.modelName === "Post") {
      const newMetaData = await MetaData.create({
        filePath: req.file.path,
      });
      req.body.photoId = newMetaData._id;
    }
    if (Model.modelName === "Comment") {
      req.body.postId = req.params.postId;
    }
    const doc = await Model.create(req.body);
    if (!doc) {
      return next(new AppError(`Can't not create ${Model.modelName}`));
    }
    res.status(201).send(`You create ${Model.modelName}`);
  });

exports.readOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.popOptions(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No doc found with that ID", 404));
    }
    res.status(200).send(`You read ${Model.modelName}`);
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    req.body.createdAt = Date.now();
    queryStr = "";
    if (Model.modelName === "Post") {
      queryStr = req.params.postId;
      const currentPost = await Model.findById(queryStr);
      if (currentPost.userId.toString() !== req.user.id) {
        return next(new AppError("This post is not belong to you", 401));
      }
    }
    const doc = await Model.findByIdAndUpdate(queryStr, req.body, {
      runValidation: true,
      new: true,
    });
    if (!doc) {
      return next(new AppError("No document found with that ID ", 404));
    }
    res.status(200).send(`You update ${Model.modelName}`);
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    queryStr = "";
    if (Model.modelName === "Post") {
      queryStr = req.params.postId;
      const currentPost = await Model.findById(queryStr);
      if (currentPost.userId.toString() !== req.user.id) {
        return next(new AppError("This post is not belong to you", 401));
      }
    }
    const doc = await Model.findByIdAndDelete(queryStr);
    if (!doc) {
      return next(new AppError("No document found with that ID ", 404));
    }
    res.status(204).send(`You delete ${Model.modelName}`);
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const currentUser = await User.find({
      profileName: req.params.profileName,
    });
    const conditions = {};
    if (Model.modelName === "Post") {
      conditions.userId = currentUser[0]._id.toString();
    }
    if (Model.modelName === "Comment") {
      conditions.postId = req.params.postId;
    }
    const All = await Model.find(conditions).sort({ createdAt: -1 });
    //const All = await Model.find();
    res.status(200).send(All);
  });
