const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  birthday: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  vouchers: {
    type: Number,
    default: 0,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
    required: true,
  },
  credits: {
    type: Number,
    default: 0,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "active"],
    default: "active",
    required: true,
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
