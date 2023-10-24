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
      required: true,
    },
    status: {
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
