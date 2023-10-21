const createError = require("http-errors");
const mongoose = require("mongoose");
const Comment = require("../Models/Comment.model");
const Post = require("../Models/Post.model");
const User = require("../Models/User");
const Like = require("../Models/Like.model");
const Cloudinary = require("../helper/uplode-image");

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
          const serverBaseUrl = "https://together-backend-0070.onrender.com";
          return {
            ...post._doc,
            number_of_comments: Comments.length,
            number_of_likes: likes.length,
            comments: commentsWithUser,
            likes: likesWithUser,
            user: user[0],
            photo: post.photo ? `${serverBaseUrl}/${post.photo}` : null,
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

  // createNewPostMiddleware: upload.single("photo"), // Use upload middleware for file upload
  createNewPost: async (req, res, next) => {
    try {
      const Imageresult = await Cloudinary.uploader.upload(req.file.path, {
        public_id: `${req.body.user_id}`,
      });
      let post = new Post({
        description: req.body.description,
        user_id: req.body.user_id,
        category: req.body.category,
        needed: req.body.needed,
        code: req.body.code,
        type: req.body.type,
        zone: req.body.zone,
        photo: Imageresult.url,
      });
      const result = await post.save();
      res.status(200).json({
        message: "Post Added Successfully!",
        post: post,
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        res.status(404).json({
          message: error.message,
        });
        return;
      }
      res.status(500).json({
        error: error,
      });
      return;
    }
  },

  findPostByZone: async (req, res, next) => {
    try {
      const rewards = await Post.find({ zone: req.params.zone, type: undefined }, { __v: 0 });
      res.status(200).json({
        posts: rewards,
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Post Zone"));
        return;
      }
      next(error);
    }
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

  findPostByZoneAndType: async (req, res, next) => {
    try {
      const posts = await Post.find({ zone: req.params.zone, type: req.params.type }, { __v: 0 });
      res.status(200).json({
        posts: posts,
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid post type"));
        return;
      }
      next(error);
    }
  },

  updateAPost: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = {
        description: req.body.description,
        user_id: req.body.user_id,
        category: req.body.category,
        needed: req.body.needed,
        code: req.body.code,
        zone: req.body.zone,
      };

      if (req.file) {
        // Check if a new image file is provided in the request
        updates.photo = req.file.path;
      }
      const options = { new: true };

      const result = await Post.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "Post does not exist");
      }

      res.status(200).json({
        message: "Post Edited Successfully!",
        post: result,
      });
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
