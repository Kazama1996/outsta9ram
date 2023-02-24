const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    maxLength: 14,
    minLength: 8,
    select: false,
  },
  passwordChangeAt: Date,
});

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

userSchema.pre("save", async function (next) {
  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
