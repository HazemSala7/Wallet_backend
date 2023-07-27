const mongoose = require("mongoose");
const User = require("../Models/User");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    body: {
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

// Define a model method to generate the value for newProperty based on userId
PostSchema.methods.generateNewPropertyValue = async function (User_ID) {
  // return "tt";
  // console.log("i12121212d", User_ID);
  const user = await User.findById(User_ID);
  // console.log("user", user);
  // if (user) {
  return "tt";
  // } else {
  //   return "default value";
  // }
};

const Post = mongoose.model("post", PostSchema);
module.exports = Post;
// module.exports = {
//   Post, // Export the Post model
//   // generateNewPropertyValue: PostSchema.methods.generateNewPropertyValue, // Export the generateNewPropertyValue method
// };
