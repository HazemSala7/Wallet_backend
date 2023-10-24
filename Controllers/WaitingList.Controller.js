const createError = require("http-errors");
const mongoose = require("mongoose");
const WaitingList = require("../Models/WaitingList.model");

module.exports = {
  getAllWaitingLists: async (req, res, next) => {
    try {
      const results = await WaitingList.find({}, { __v: 0 });
      res.status(200).json({
        waiting_lists: results,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewWaitingList: async (req, res, next) => {
    try {
      // Create a new Post document and set the post_id to the User's _id
      let waitinglist = new WaitingList({
        status: req.body.status,
        user_id: req.body.user_id,
        type: req.body.type,
      });
      await waitinglist.save();
      res.status(200).json({
        message: "WaitingList Added Successfully!",
        waiting_list_details: waitinglist,
      });
    } catch (error) {
      console.log(error.message);
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

  findWaitingListById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const product = await WaitingList.findById(id);
      // const product = await Product.findOne({ _id: id });
      if (!product) {
        throw createError(404, "WaitingList does not exist.");
      }
      res.status(200).json({
        waiting_list_details: product,
      });
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

      const result = await WaitingList.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "WaitingList does not exist");
      }
      res.status(200).json({
        waiting_list_details: result,
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid WaitingList Id"));
      }

      next(error);
    }
  },

  deleteAWaitingList: async (req, res, next) => {
    const postId = req.body.post_id;
    const userId = req.body.user_id;

    try {
      const result = await WaitingList.findOneAndDelete({
        post_id: postId,
        user_id: userId,
      });

      if (!result) {
        throw createError(404, "Like does not exist.");
      }

      res.status(200).json({
        message: "Like deleted successfully!",
        like_details: result,
      });
    } catch (error) {
      console.log(error.message);

      if (error instanceof mongoose.CastError) {
        res.status(404).json({
          message: "Invalid Like id",
        });
        return;
      }

      next(error);
    }
  },
};
