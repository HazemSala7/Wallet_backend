const createError = require("http-errors");
const mongoose = require("mongoose");
const Comment = require("../Models/Comment.model");
const Post = require("../Models/Post.model");
const User = require("../Models/User");

module.exports = {
  getAllComment: async (req, res, next) => {
    try {
      const results = await Comment.find({}, { __v: 0 });
      // console.log(results.lastIndexOf);
      res.send({
        comments: results,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewComment: async (req, res, next) => {
    try {
      // Find the User document by its _id
      // console.log(req.body.post_id);
      const post = await Post.findById(req.body.post_id);
      // console.log(post);
      if (!post) {
        console.log("Post not found.");
        return;
      }
      const user = await User.findById(req.body.user_id);
      // console.log(post);
      if (!user) {
        console.log("User not found.");
        return;
      }
      // Create a new Post document and set the post_id to the User's _id
      let comment = new Comment({
        post_id: post._id,
        user_id: user._id,
        body: req.body.body,
      });
      await comment.save();
      res.json({
        vouchar: "Comment Created successfully.",
      });
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
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

  findCommentById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const product = await Comment.findById(id);
      // const product = await Product.findOne({ _id: id });
      if (!product) {
        throw createError(404, "Comment does not exist.");
      }
      res.send(product);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Comment id"));
        return;
      }
      next(error);
    }
  },

  updateAComment: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Comment.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "Comment does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid Comment Id"));
      }

      next(error);
    }
  },

  deleteAComment: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Comment.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, "Comment does not exist.");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Comment id"));
        return;
      }
      next(error);
    }
  },
};
