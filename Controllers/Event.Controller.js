const createError = require("http-errors");
const mongoose = require("mongoose");
const Cloudinary = require("../helper/uplode-image");
const Event = require("../Models/Event.model");

module.exports = {
  getAllEvents: async (req, res, next) => {
    try {
      const results = await Event.find({}, { __v: 0 });
      const updatedResults = await Promise.all(
        results.map(async (post) => {
          const serverBaseUrl = "http://localhost:3000";
          return {
            ...post._doc,
            image: post.image ? `${serverBaseUrl}/${post.image}` : null,
          };
        })
      );
      res.status(200).json({
        events: updatedResults,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewEvent: async (req, res, next) => {
    try {
      const Imageresult = await Cloudinary.uploader.upload(req.file.path, {
        public_id: `${req.body.published_by}`,
      });
      let post = new Event({
        published_by: req.body.published_by,
        needed: req.body.user_id,
        quantity_needed: req.body.quantity_needed,
        category_type: req.body.needed,
        lattiude: req.body.lattiude,
        longitude: req.body.longitude,
        date_from: req.body.date_from,
        date_to: req.body.date_to,
        time_from: req.body.time_from,
        time_to: req.body.time_to,
        reward: req.body.reward,
        quantity_reward: req.body.quantity_reward,
        description: req.body.description,
        file: req.body.file,
        image: Imageresult.url,
        user_id: req.body.user_id,
      });
      const result = await post.save();
      res.status(200).json({
        message: "Event Added Successfully!",
        event: post,
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
