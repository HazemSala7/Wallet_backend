const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WaitonglistSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["task", "event"],
      default: "task",
      required: true,
    },
    type_id: {
      type: String,
      required: true,
    },
    start_time: {
      type: String,
      required: true,
    },
    end_time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["aceept", "reject", "pending"],
      default: "pending",
      required: true,
    },
    paused: {
      type: String,
      enum: ["true", "false"],
      default: "false",
      required: true,
    },
  },
  { timestamps: {} }
);

const Waitonglist = mongoose.model("waitinglist", WaitonglistSchema);
module.exports = Waitonglist;
