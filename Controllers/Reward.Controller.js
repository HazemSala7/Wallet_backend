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
      res.status(200).json({
        rewards: results,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  getUserRewards: async (req, res, next) => {
    const user_id = req.params.id;
    try {
      const rewards = await Reward.find({ receiver_id: user_id }, { __v: 0 });
      res.status(200).json({
        rewards: rewards,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  getRewardsSenders: async (req, res, next) => {
    const user_id = req.params.id;
    try {
      const rewards = await Reward.find(
        { status: "pending", sender_id: user_id },
        { __v: 0 }
      );
      res.status(200).json({
        rewards: rewards,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  getRewardsReceivers: async (req, res, next) => {
    const user_id = req.params.id;
    try {
      const rewards = await Reward.find(
        { status: "pending", receiver_id: user_id },
        { __v: 0 }
      );
      res.status(200).json({
        rewards: rewards,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewReward: async (req, res, next) => {
    try {
      console.log(req.body);
      const newReward = new Reward({
        type: req.body.type,
        name: req.body.name,
        value: req.body.value,
        status: "valid",
        location: req.body.location,
        sender_id: "null",
        receiver_id: req.body.receiver_id,
      });

      const result = await newReward.save();
      res.status(200).json({
        message: "Reward created successfully.",
        reward: result,
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        res.status(404).json({
          message: "Invalid Reward id",
        });
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

  sendReward: async (req, res, next) => {
    try {
      const reward = await Reward.findById(req.body.reward_id);
      const user_sender = await User.findById(req.body.sender_id);
      const user_receiver = await User.findById(req.body.receiver_id);

      if (!user_sender) {
        throw createError(404, "User does not exist.");
      }
      if (!user_receiver) {
        throw createError(404, "User does not exist.");
      }
      if (!reward) {
        throw createError(404, "Reward not found.");
      }
      reward.status = "pending";
      reward.sender_id = req.body.sender_id;
      reward.receiver_id = req.body.receiver_id;
      await reward.save();
      res.status(200).json({
        message: "Reward sent successfully!",
        reward: reward,
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid Reward Id"));
      }

      next(error);
    }
  },

  denyRewards: async (req, res, next) => {
    try {
      const rewardIds = req.body.reward_ids;
      const deniedRewards = [];
      for (const rewardId of rewardIds) {
        const reward = await Reward.findById(rewardId);
        if (!reward) {
          throw createError(404, `Reward with ID ${rewardId} not found.`);
        }
        reward.status = "valid";
        // reward.sender_id = "null";
        reward.receiver_id = reward.sender_id;

        await reward.save();
        deniedRewards.push(reward);
      }

      res.status(200).json({
        message: "Rewards denied successfully!",
        deniedRewards: deniedRewards,
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid Reward Id"));
      }

      next(error);
    }
  },

  acceptRewards: async (req, res, next) => {
    try {
      const rewardIds = req.body.reward_ids;
      const processedRewards = [];
      let message1 = ""; // Initialize an empty message string
      for (const rewardId of rewardIds) {
        const reward = await Reward.findById(rewardId);
        console.log("reward.type");
        console.log(reward);
        const user_sender = await User.findById(reward.sender_id);

        const user_receiver = await User.findById(reward.receiver_id);

        if (!user_sender) {
          throw createError(404, "User does not exist.");
        }
        if (!user_receiver) {
          throw createError(404, "User does not exist.");
        }
        if (!reward) {
          throw createError(404, "Reward not found.");
        }

        if (reward.type === "vouchers") {
          user_sender.vouchers -= reward.value;
          user_receiver.vouchers += parseInt(reward.value);
          message1 = "Voucher sent successfully.";
        } else if (reward.type === "points") {
          user_sender.points -= reward.value;
          user_receiver.points += parseInt(reward.value);
          message1 = "Points sent successfully.";
        } else if (reward.type === "credits") {
          user_sender.credits -= reward.value;
          user_receiver.credits += parseInt(reward.value);
          message1 = "Credits sent successfully.";
        } else {
          throw createError(400, "Invalid reward type.");
        }

        reward.status = "valid";

        await Promise.all([
          reward.save(),
          user_sender.save(),
          user_receiver.save(),
        ]);
        processedRewards.push(reward);
      }

      res.json({
        message: message1,
        rewards: processedRewards,
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid Reward Id"));
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
