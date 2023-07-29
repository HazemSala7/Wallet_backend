const createError = require("http-errors");
const mongoose = require("mongoose");
const Comment = require("../Models/Comment.model");
const Post = require("../Models/Post.model");
const User = require("../Models/User");
const Like = require("../Models/Like.model");

module.exports = {
  getAllPosts: async (req, res, next) => {
    try {
      const results = await Post.find({}, { __v: 0 });
      const updatedResults = await Promise.all(
        results.map(async (post) => {
          const Comments = await Comment.find(
            { post_id: post._id },
            { __v: 0 }
          );
          const commentPromises = Comments.map(async (comment) => {
            const user = await User.find({ _id: post.user_id }, { __v: 0 });
            return {
              ...comment._doc,
              user: user[0],
            };
          });
          const commentsWithUser = await Promise.all(commentPromises);
          const likes = await Like.find({ post_id: post._id }, { __v: 0 });
          const likesPromises = likes.map(async (like) => {
            const user = await User.find({ _id: post.user_id }, { __v: 0 });
            return {
              ...like._doc,
              user: user[0],
            };
          });
          const likesWithUser = await Promise.all(commentPromises);
          const user = await User.find({ _id: post.user_id }, { __v: 0 });
          return {
            ...post._doc,
            number_of_comments: Comments.length,
            number_of_likes: likes.length,
            comments: commentsWithUser,
            likes: likesWithUser,
            user: user[0],
          };
        })
      );
      res.status(200).json({
        Posts: updatedResults,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewPost: async (req, res, next) => {
    try {
      const product = new Post(req.body);
      const result = await product.save();
      res.status(200).json({
        message: "Post Added Successfully!",
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        res.status(404).json({
          message: error.message,
        });
        return;
      }
      next(error);
    }

    /*Or:
  If you want to use the Promise based approach*/
    /*
  const product = new Product({
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err.message);
    }); 
    */
  },

  findPostById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const product = await Post.findById(id);
      // const product = await Product.findOne({ _id: id });
      if (!product) {
        throw createError(404, "Post does not exist.");
      }
      res.status(200).json({
        post_details: product,
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Post id"));
        return;
      }
      next(error);
    }
  },

  updateAPost: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Post.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "Post does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid Post Id"));
      }

      next(error);
    }
  },

  deleteAPost: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Post.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, "Post does not exist.");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Post id"));
        return;
      }
      next(error);
    }
  },
};
