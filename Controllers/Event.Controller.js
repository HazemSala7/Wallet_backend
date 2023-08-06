const createError = require("http-errors");
const mongoose = require("mongoose");

const Event = require("../Models/Event.model");

module.exports = {
  getAllEvents: async (req, res, next) => {
    try {
      const results = await Event.find({}, { __v: 0 });
      res.status(200).json({
        events: results,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewEvent: async (req, res, next) => {
    try {
      const product = new Event(req.body);
      const result = await product.save();
      res.status(200).json({
        message: "Event Added Successfully!",
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

  findEventById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const product = await Event.findById(id);
      // const product = await Product.findOne({ _id: id });
      if (!product) {
        throw createError(404, "Event does not exist.");
      }
      res.status(200).json({
        event_details: product,
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        res.status(404).json({
          message: "Invalid Event id",
        });
        return;
      }
      next(error);
    }
  },

  updateAEvent: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Event.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "Event does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        res.status(404).json({
          message: "Invalid Event id",
        });
        return;
      }

      next(error);
    }
  },

  deleteAEvent: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Event.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, "Event does not exist.");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        res.status(404).json({
          message: "Invalid Event id",
        });
        return;
      }
      next(error);
    }
  },
};
