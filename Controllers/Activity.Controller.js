const createError = require("http-errors");
const mongoose = require("mongoose");

const Activity = require("../Models/Activity.model");

module.exports = {
  getAllActivities: async (req, res, next) => {
    try {
      const results = await Activity.find({}, { __v: 0 });
      res.status(200).json({
        activities: results,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewActivity: async (req, res, next) => {
    try {
      const product = new Activity(req.body);
      const result = await product.save();
      res.status(200).json({
        message: "Activity Added Successfully!",
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

  findActivityById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const product = await Activity.findById(id);
      // const product = await Product.findOne({ _id: id });
      if (!product) {
        throw createError(404, "Activity does not exist.");
      }
      res.status(200).json({
        activity_details: product,
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        res.status(404).json({
          message: "Invalid Activity id",
        });
        return;
      }
      next(error);
    }
  },

  updateAActivity: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Activity.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "Activity does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        res.status(404).json({
          message: "Invalid Activity id",
        });
        return;
      }

      next(error);
    }
  },

  deleteAActivity: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Activity.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, "Activity does not exist.");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        res.status(404).json({
          message: "Invalid Activity id",
        });
        return;
      }
      next(error);
    }
  },
};
