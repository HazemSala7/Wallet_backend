const mongoose = require("mongoose");
const User = require("./User");
const Schema = mongoose.Schema;

const PostItemsSchema = new Schema(
  {
    item: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    remark: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    zone: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    // comments: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "comment",
    //   },
    // ],
  },
  { timestamps: {} }
);

const PostItems = mongoose.model("postitems", PostItemsSchema);
module.exports = PostItems;
// module.exports = {
//   Post, // Export the Post model
//   // generateNewPropertyValue: PostSchema.methods.generateNewPropertyValue, // Export the generateNewPropertyValue method
// };
