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
  birthday: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  vouchars: {
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
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
