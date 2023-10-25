const createError = require("http-errors");
const mongoose = require("mongoose");
const Cloudinary = require("../helper/uplode-image");
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
      const Imageresult = await Cloudinary.uploader.upload(req.file.path);
      let product = new Task({
        contact_name: req.body.contact_name,
        contact_number: req.body.contact_number,
        subtitle: req.body.subtitle,
        indoor_location: req.body.indoor_location,
        outdoor_location: req.body.outdoor_location,
        published_by: req.body.published_by,
        needed: req.body.needed,
        quantity_needed: req.body.quantity_needed,
        category_type: req.body.category_type,
        task_type: req.body.task_type,
        lattiude: req.body.lattiude,
        longitude: req.body.longitude,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        reward: req.body.reward,
        quantity_reward: req.body.quantity_reward,
        description: req.body.description,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        file: req.body.file,
        image: Imageresult.url,
        user_id: req.body.user_id,
        zone: req.body.zone,
        time_added: new Date().getTime(),
      });
      const result = await product.save();
      const serverBaseUrl = "https://together-backend-0070.onrender.com";
      res.send({
        message: "Task Added Successfully!",
        task: product,
      });
    } catch (error) {
      console.log("error");
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
  findTaskByZone: async (req, res, next) => {
    try {
      const rewards = await Task.find({ zone: req.params.zone }, { __v: 0 });
      res.status(200).json({
        tasks: rewards,
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Task Zone"));
        return;
      }
      next(error);
    }
  },

  updateATask: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = {
        contact_name: req.body.contact_name,
        contact_number: req.body.contact_number,
        subtitle: req.body.subtitle,
        indoor_location: req.body.indoor_location,
        outdoor_location: req.body.outdoor_location,
        published_by: req.body.published_by,
        needed: req.body.needed,
        quantity_needed: req.body.quantity_needed,
        category_type: req.body.category_type,
        task_type: req.body.task_type,
        lattiude: req.body.lattiude,
        longitude: req.body.longitude,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        reward: req.body.reward,
        quantity_reward: req.body.quantity_reward,
        description: req.body.description,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        file: req.body.file,
        user_id: req.body.user_id,
        zone: req.body.zone,
      };

      if (req.file) {
        // Check if a new image file is provided in the request
        updates.image = req.file.path;
      }

      const options = { new: true };

      const result = await Task.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "Task does not exist");
      }

      res.status(200).json({
        message: "Task Edited Successfully!",
        post: result,
      });
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
      res.status(200).json({
        message: "Task deleted successfully!",
        task_details: result,
      });
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
