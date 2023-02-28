const crudController = require("./crudController");
const Post = require("../model/postModel");
const AppError = require("../utils/appError");
const MetaData = require("../model/metadataModel");
const Like = require("../model/likeModel");
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/image/post");
  },
  filename: (req, file, cb) => {
    // user-795468546546as-+6+6565416541.jpeg
    const ext = file.mimetype.split("/")[1]; //extension
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadPostPhoto = upload.single("photo");

exports.createPost = crudController.createOne(Post);
exports.updatePost = crudController.updateOne(Post);
exports.deletePost = crudController.deleteOne(Post);
exports.getAllPost = crudController.getAll(Post);
// Like post
exports.likePost = async (req, res, next) => {
  const Like = await Like.create({
    postId: req.params.postId,
    userId: req.user.id,
  });
  res.status(200).send(`${req.user.profileName} likes your post`);
};
// dislike post
exports.cancelLike = async (req, res, next) => {
  const cancel = await Like.findOneAndDelete({
    userId: req.userId,
    postId: req.params.Id,
  });
  res.status(200).send(`${req.user.profileName} cancel the likes to your post`);
};
// this is for crearte post.
exports.test = async (req, res, next) => {
  req.body.time = Date.now();
  console.log(req.body);

  const newMeta = await MetaData.create({ path: req.file.path });

  const doc = await Post.create({
    createdById: req.user._id,
    caption: req.body.caption,
    photoId: newMeta._id,
    createAt: Date.now(),
  });

  res.status(200).send("success");
};
