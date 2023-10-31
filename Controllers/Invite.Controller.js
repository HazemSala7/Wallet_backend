const createError = require("http-errors");
const mongoose = require("mongoose");
const Cloudinary = require("../helper/uplode-image");
const Invite = require("../Models/Invite.model");

module.exports = {
  getAllInvites: async (req, res, next) => {
    try {
      const results = await Invite.find({}, { __v: 0 });
      res.status(200).json({
        Invites: results,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewInvite: async (req, res, next) => {
    try {
      let product = new Invite({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        reward: req.body.reward,
        role: req.body.role,
        note: req.body.note,
      });
      const result = await product.save();
      res.status(200).json({
        message: "Invite Added Successfully!",
        invite_details: product,
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

  findInviteById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const product = await Invite.findById(id);
      // const product = await Product.findOne({ _id: id });
      if (!product) {
        throw createError(404, "Invite does not exist.");
      }
      res.status(200).json({
        invite_details: product,
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        res.status(404).json({
          message: "Invalid Invite id",
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
