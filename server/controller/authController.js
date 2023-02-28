const User = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id: id }, `${process.env.JWT_SECRET_KEY}`, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

const sendJWTToken = (statusCode, user, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };
  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).send("success");
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  sendJWTToken(201, newUser, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError("Please provide valid email or password", 401));

  const user = await User.findOne({ email: email }).select("password");
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError("User can not found", 401));

  //send JWT token
  sendJWTToken(200, user, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token = req.cookies["jwt"];
  if (!token) {
    return next(
      new AppError("You are not loggin in! Please login to get access", 401)
    );
  }
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );
  const currentUser = await User.findOne({ _id: decoded.id });

  if (!currentUser) {
    return next(
      new AppError("User  belong to this token does no longer exists", 401)
    );
  }

  if (currentUser.changePasswordAfter(decoded.iat)) {
    return next(new AppError("Token is expired , please login again", 401));
  }

  req.user = currentUser;

  next();
});

exports.test = (req, res, next) => {
  res.status(200).send(req.user);
};

exports.isolated = (req, res, next) => {
  if (req.params.profileName !== req.user.profileName) {
    return next(new AppError("You are not allow to access", 401));
  }
  next();
};
