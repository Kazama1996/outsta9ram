const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "A user must have email as account"],
    unique: true,
  },
  fullName: {
    type: String,
    required: [true, "A user must have fullName"],
  },
  profileName: {
    type: String,
    required: [true, "A user must have a profileName"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
  },
  avatar: {
    type: String,
  },
  createAt: {
    type: Date,
  },
  signature: {
    type: String,
    default: "Say somthing...",
  },
  changePasswordAt: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpire: {
    type: Date,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.checkJWTExpire = function (iatTime) {
  let changeTimestamp = 0;
  if (this.changePasswordAt) {
    changeTimestamp = this.changePasswordAt.getTime() / 1000;
  }
  return changeTimestamp > iatTime ? true : false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpire = Date.now() + 1000 * 60 * 10;
  return resetToken;
};

userSchema.index({ profileName: 1, createdAt: 1 });

const User = mongoose.model("User", userSchema);

module.exports = User;
