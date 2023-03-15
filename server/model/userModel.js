import mongoose from "mongoose";
import bcrypt from "bcrypt";
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
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

export { User };
