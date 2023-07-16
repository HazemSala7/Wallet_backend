const createError = require("http-errors");
const mongoose = require("mongoose");
const User = require("../Models/User");
const Reward = require("../Models/Reward.model");

module.exports = {
  getAllRewards: async (req, res, next) => {
    // return "o";
    try {
      const results = await Reward.find({}, { __v: 0 });
      // const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Product.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewReward: async (req, res, next) => {
    try {
      const type = req.body.type;
      console.log("req.body.user_id");
      console.log(req.body.user_id);
      // return "req.body.user_id";
      const user_sender = await User.findById(req.body.user_id);

      // const product = await Product.findOne({ _id: id });
      if (!user_sender) {
        throw createError(404, "User does not exist.");
      }
      const product = new Reward(req.body);
      const result = await product.save();
      if (type === "vouchars") {
        user_sender.vouchars -= req.body.value;
        await user_sender.save();
        const contact = await User.findById(req.body.contact_id);
        contact.vouchars += parseInt(req.body.value);
        await contact.save();
        res.json({
          vouchar: "Voucher sent successfully.",
          message: type,
        });
      } else if (type === "points") {
        user_sender.points -= req.body.value;
        await user_sender.save();
        const contact = await User.findById(req.body.contact_id);
        contact.points += parseInt(req.body.value);
        await contact.save();
        res.json({
          vouchar: "Points sent successfully.",
          message: type,
        });
      } else if (type === "credits") {
        user_sender.credits -= req.body.value;
        await user_sender.save();
        const contact = await User.findById(req.body.contact_id);
        contact.credits += parseInt(req.body.value);
        await contact.save();
        res.json({
          vouchar: "Credits sent successfully.",
          message: type,
        });
      } else {
        res.json({
          message: "Please Enter your type (vouchars , credits , points)",
        });
      }
      // res.send({
      //   status: "true",
      // });
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

  findRewardById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const product = await Reward.findById(id);
      // const product = await Product.findOne({ _id: id });
      if (!product) {
        throw createError(404, "Reward does not exist.");
      }
      res.send(product);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Reward id"));
        return;
      }
      next(error);
    }
  },

  updateAReward: async (req, res, next) => {
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

  deleteAReward: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Reward.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, "Reward does not exist.");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Reward id"));
        return;
      }
      next(error);
    }
  },
};
