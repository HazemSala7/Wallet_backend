const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    default: "male",
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  vouchers: {
    type: Number,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  credits: {
    type: Number,
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
