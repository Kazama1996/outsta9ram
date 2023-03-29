const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
  changePasswordAt: {
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

const User = mongoose.model("User", userSchema);

module.exports = User;
