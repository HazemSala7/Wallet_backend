const createError = require("http-errors");
const mongoose = require("mongoose");
const Cloudinary = require("../helper/uplode-image");
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
      const Imageresult = await Cloudinary.uploader.upload(req.file.path, {
        public_id: `${req.body.contact_name}`,
      });
      let product = new Activity({
        contact_name: req.body.contact_name,
        contact_number: req.body.contact_number,
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
        subtitle: req.body.subtitle,
        time_added: new Date().getTime(),
      });
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
  findActivityByZone: async (req, res, next) => {
    try {
      const rewards = await Activity.find(
        { zone: req.params.zone },
        { __v: 0 }
      );
      res.status(200).json({
        activities: rewards,
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Activity Zone"));
        return;
      }
      next(error);
    }
  },

  findActivityById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const product = await Activity.findById(id);
      // const product = await Product.findOne({ _id: id });
      if (!product) {
        throw createError(404, "Activity does not exist.");
      }
      res.status(200).json(product);
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
