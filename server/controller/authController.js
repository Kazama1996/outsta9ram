import mongoose from "mongoose";
import { User } from "../model/userModel.js";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";
import bcrypt from "bcrypt";
const generateJWT = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIREIN,
  });
};

const setJWTCookie = function (statusCode, user, res) {
  const token = generateJWT(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIREIN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
  };
  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).send("Send JWT via cookie");
};

export const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  setJWTCookie(201, newUser, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Invalid email or password", 400));
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return next(new AppError("User with this email could not found", 201));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Invalid email or password", 400));
  }

  res.send("hello world2");
});

export const protect = async (req, res, next) => {
  const { jwt: jwtCookie } = req.cookies;
  const decoded = await jwt.verify(jwtCookie, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  console.log(user);
  next();
};

export const result = (req, res, next) => {
  res.status(200).send("success");
};
