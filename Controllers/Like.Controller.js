const createError = require("http-errors");
const mongoose = require("mongoose");
const Post = require("../Models/Post.model");
const User = require("../Models/User");
const Like = require("../Models/Like.model");

module.exports = {
  getAllLikes: async (req, res, next) => {
    try {
      const results = await Like.find({}, { __v: 0 });
      // const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Product.find({ price: 699 }, {});
      res.send({
        likes: results,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewLike: async (req, res, next) => {
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
      let like = new Like({
        post_id: post._id,
        user_id: user._id,
      });
      await like.save();
      res.send({
        message: "Like Added Successfully!",
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

  findLikeById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const product = await Like.findById(id);
      // const product = await Product.findOne({ _id: id });
      if (!product) {
        throw createError(404, "Like does not exist.");
      }
      res.send(product);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Like id"));
        return;
      }
      next(error);
    }
  },

  updateALike: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Like.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "Like does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid Like Id"));
      }

      next(error);
    }
  },

  deleteALike: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Like.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, "Like does not exist.");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Like id"));
        return;
      }
      next(error);
    }
  },
};
