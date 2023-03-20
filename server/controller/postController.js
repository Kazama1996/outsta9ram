import { Post } from "../model/postModel.js";
import { catchAsync } from "../utils/catchAsync.js";
export const createPost = catchAsync(async (req, res, next) => {
  req.body.createdAt = Date.now();
  req.body.userId = req.user.id;
  const newPost = await Post.create(req.body);

  res.status(200).send(newPost);
});
