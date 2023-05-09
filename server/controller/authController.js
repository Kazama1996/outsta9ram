const mongoose = require("mongoose");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { promisify } = require("util");
const sendEmail = require("../utils/email");

const generateJWT = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIREIN,
  });
};

const setJWTCookie = function (statusCode, user, res, caller = "") {
  const token = generateJWT(user._id);
  let message = "";
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIREIN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };
  user.password = undefined;
  switch (caller) {
    case "signup":
      message = "Regist success";
      break;
    case "login":
      message = "Login success";
      break;
    case "updatePassword":
      message = "Your password is updated successfully.";
      break;
  }
  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({ message: message });
};

exports.signup = catchAsync(async (req, res, next) => {
  const userProfileName = await User.findOne({
    profileName: req.body.profileName,
  });

  if (userProfileName) {
    return next(
      new AppError(
        "The profileName you're trying to add, has been registered as an account already",
        401
      )
    );
  }
  const userEmail = await User.findOne({ email: req.body.email });

  if (userEmail) {
    return next(
      new AppError(
        "The email you're trying to add, has been registered as an account already",
        401
      )
    );
  }

  const newUser = await User.create({
    ...req.body,
    avatar: process.env.AWS_S3BUCKET_URL + "default/Avatar.png",
  });
  setJWTCookie(201, newUser, res, "signup");
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Invalid email or password", 400));
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return next(new AppError("Invalid email or password", 401));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Invalid email or password", 401));
  }
  setJWTCookie(200, user, res, "login");
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

exports.forgotPassword = async (req, res, next) => {
  //find the user is he/she exist in our database
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("User with this email could not found", 404));
  }

  //if so, send an reset password token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validatebeforeSave: false });
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/redirectPasswordReset/${resetToken}`;

  const message = `<p>Forgot your password ? Click <a href="${resetURL}">here</a> to reset your password. If you didn't forget your password, please ignore thie email</p>`;
  try {
    await sendEmail({
      to: user.email,
      subject: `Your password reset token(valid for 10 minutes)`,
      message: message,
    });
    res.status(200).send("Token sent to email");
  } catch (err) {
    console.log(err);
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

exports.redirectPasswordReset = catchAsync(async (req, res, next) => {
  const hashToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashToken,
    passwordResetExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Token belongs to this user is invalid", 401));
  }

  const cookieOptions = {
    expires: new Date(Date.now() + 10 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };
  res.cookie("PWDReset", req.params.token, cookieOptions);
  //res.status(200).send("success");
  res.status(301).redirect("http://localhost:3000/passwordReset");
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // retrive the cookie from server.
  const { PWDReset: PWDResetCookie } = req.cookies;
  const hashToken = crypto
    .createHash("sha256")
    .update(PWDResetCookie)
    .digest("hex");

  // verify the cookie
  const user = await User.findOne({
    passwordResetToken: hashToken,
    passwordResetExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new AppError(
        "Token belongs to this user is invalid, please refill fill in the email in forgot password page again to obtain the new token",
        401
      )
    );
  }
  // reset the password
  user.password = req.body.password;
  // set the password Reset token to undefined.
  user.passwordResetToken = undefined;
  user.passwordResetExpire = undefined;
  await user.save({ validateBeforeSave: false });
  res
    .clearCookie("PWDReset")
    .json({ message: "Your password is reset! Please Login again!!" });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.id });
  if (!user) {
    return next(new AppError("User could not found", 404));
  }
  user.password = req.body.password;
  await user.save({ validateBeforeSave: false });
  setJWTCookie(200, user, res, "updatePassword");
});

exports.logout = catchAsync(async (req, res, next) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIREIN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };
  res.clearCookie("jwt", cookieOptions);
  res.status(200).send("logout");
});

exports.result = (req, res, next) => {
  req.user.password = undefined;
  req.user.__v = undefined;
  req.user.email = undefined;
  req.user.fullName = undefined;
  res.status(200).send(req.user);
};
