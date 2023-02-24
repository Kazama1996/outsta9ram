const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const MetaData = require("../model/metadataModel");

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log(req.file);

    req.body.createdAt = Date.now();
    req.body.createdBy = req.user.id;
    const metadata = await MetaData.findOne({
      originalname: req.file.originalname,
    });
    console.log(metadata);
    if (Model.modelName === "Post" && !metadata) {
      console.log("You create a new metadata");
      const newMetaData = await MetaData.create({
        path: req.file.path,
        originalname: req.file.originalname,
      });
      req.body.photoId = newMetaData._id;
    } else {
      console.log("You are already created it");
      req.body.photoId = metadata._id;
    }
    if (Model.modelName === "Comment") {
      req.body.postId = req.params.postId;
    }
    console.log(req.body);
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
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      runValidation: true,
      new: true,
    });
    if (!doc) {
      return next(new AppError("No document found with that ID ", 404));
    }
    res.status(200).send(`You update ${Model.modelName}`);
  });

exports.deleteOne = (model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("No document found with that ID ", 404));
    }
    res.status(204).send(`You delete ${Model.modelName}`);
  });
