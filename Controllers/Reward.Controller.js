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
      const { type, name, value, location, user_id, rewardId } = req.body;

      const newReward = new Reward({
        type,
        name,
        value,
        location,
        user_id,
        rewardId,
      });

      const result = await newReward.save();
      res.status(201).json({
        message: "Reward created successfully.",
        reward: result,
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Reward id"));
        return;
      }
      next(error);
    }
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

  findRewardByIds: async (req, res, next) => {
    const rewardIds = req.body;

    try {
      const rewards = await Reward.find({ _id: { $in: rewardIds } });
      if (rewards.length === 0) {
        throw createError(404, "No rewards found with the provided IDs.");
      }

      res.send(rewards);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Reward ID"));
        return;
      }
      next(error);
    }
  },

  findRewardByUserId: async (req, res, next) => {
    const id = req.params.id;
    try {
      const product = await Reward.find({ user_id: id });
      // const product = await Product.findOne({ _id: id });
      if (!product) {
        throw createError(404, "Reward does not exist.");
      }
      res.send(product);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid User id"));
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
