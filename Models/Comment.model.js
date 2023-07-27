const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    post_id: {
      type: String,
      required: true,
    },
    // post_id: { type: Schema.Types.ObjectId, ref: "post", required: true },
  },
  { timestamps: {} }
);

const Comment = mongoose.model("comment", CommentSchema);
module.exports = Comment;
