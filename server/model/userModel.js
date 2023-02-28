const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const AppError = require("../utils/appError");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  profileName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    maxLength: 14,
    minLength: 8,
    select: false,
  },
  createdAt: Date,
  passwordChangeAt: Date,
});

userSchema.index({ profileName: 1 });

userSchema.methods.correctPassword = async function (password, userPassowrd) {
  return await bcrypt.compare(password, userPassowrd);
};

userSchema.methods.changePasswordAfter = (JWTtimeStamp) => {
  if (this.passwordChangeAt) {
    const changeTimestamp = this.passwordChangeAt.getTime() / 1000;
    return changeTimestamp > JWTtimeStamp;
  }
  return false;
};

userSchema.pre("/^find/", function (req, res, next) {
  // if (req.user.profileName !== req.params.profileName) {
  //   return next(
  //     new AppError("You can't not modify the things not belong to you", 401)
  //   );
  // }
  console.log(req.user);
  next();
});

userSchema.pre("save", async function (next) {
  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
