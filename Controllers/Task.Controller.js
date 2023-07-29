const createError = require("http-errors");
const mongoose = require("mongoose");

const Task = require("../Models/Task.model");

module.exports = {
  getAllTasks: async (req, res, next) => {
    try {
      const results = await Task.find({}, { __v: 0 });
      res.status(200).json({
        tasks: results,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewTask: async (req, res, next) => {
    try {
      const product = new Task(req.body);
      const result = await product.save();
      res.send({
        message: "Task Added Successfully!",
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

  findTaskById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const product = await Task.findById(id);
      // const product = await Product.findOne({ _id: id });
      if (!product) {
        throw createError(404, "Task does not exist.");
      }
      res.send(product);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Task id"));
        return;
      }
      next(error);
    }
  },

  updateATask: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Task.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "Task does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid Task Id"));
      }

      next(error);
    }
  },

  deleteATask: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Task.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, "Task does not exist.");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Task id"));
        return;
      }
      next(error);
    }
  },
};
