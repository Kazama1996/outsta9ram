<<<<<<< HEAD
//import mongoose from "mongoose";
//import { User } from "../model/userModel.js";
//import jwt from "jsonwebtoken";
//import { AppError } from "../utils/appError.js";
//import { catchAsync } from "../utils/catchAsync.js";
//import bcrypt from "bcrypt";
//import { promisify } from "util";

const mongoose = require("mongoose");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const { AppError } = require("../utils/appError.js");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcrypt");
const { promisify } = require("util");
=======
import mongoose from "mongoose";
import { User } from "../model/userModel.js";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";
import bcrypt from "bcrypt";
import { promisify } from "util";
import { sendEmail } from "../utils/sendMail.js";
>>>>>>> 65c3100 (backup)

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
    sameSite: "None",
  };
  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).send("Send JWT via cookie");
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    ...req.body,
    avatar: process.env.AWS_S3BUCKET_URL + "default/Avatar.png",
  });
  setJWTCookie(201, newUser, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Invalid email or password", 400));
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return next(new AppError("User with this email could not found", 401));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Invalid email or password", 400));
  }
  setJWTCookie(200, user, res);
});

exports.protect = async (req, res, next) => {
  // Retrieve jwt token from cookie.
  const { jwt: jwtCookie } = req.cookies;
  if (!jwtCookie) {
    return next(new AppError("You are not login, Please login", 404));
  }

  // Verify jwt token to get the  user's id of this request.
  const decoded = await promisify(jwt.verify)(
    jwtCookie,
    process.env.JWT_SECRET
  );

  if (!decoded) {
    return next(new AppError("Invalid token Please login again", 401));
  }
  // Query DB there has an id belong to this request.
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("User could not found", 404));
  }

  // Check whether user is change his/her password.
  if (currentUser.checkJWTExpire(currentUser.iat)) {
    return next(new AppError("Your token is expire please login again"));
  }
  req.user = currentUser;

  next();
};

<<<<<<< HEAD
exports.result = (req, res, next) => {
=======
export const forgotPassword = async (req, res, next) => {
  //find the user is he/she exist in our database
  const user = User.findOne({ email: req.email });
  if (!user) {
    return next(new AppError("User with this email could not found", 404));
  }

  //if so, send an reset password token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validatebeforeSave: false });
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `<p>Forgot your password ? Click <a href="${resetURL}">here</a> to reset your password. If you didn't forget your password, please ignore thie email</p>`;
  try {
    await sendEmail({
      to: user.email,
      subject: `Your password reset token(valid for 10 minutes)`,
      message: message,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save({ validatebeforeSave: false });
    return next(
      new AppError(
        "There is an error to sending the email , please try again later",
        500
      )
    );
  }
};

export const result = (req, res, next) => {
>>>>>>> 65c3100 (backup)
  res.status(200).send(req.user);
};
