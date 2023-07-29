const createError = require("http-errors");
const mongoose = require("mongoose");
const User = require("../Models/User");
const Reward = require("../Models/Reward.model");

module.exports = {
  sendVouchars: async (req, res, next) => {
    const { rewardId, rewardType, rewardValue, userId, contactId } = req.body;
    const parsedRewardValue = parseInt(rewardValue);
    try {
      const user_sender = await User.findById(userId);
      const reward = await Reward.findById(rewardId);
      if (!user_sender) {
        throw createError(404, "User does not exist.");
      }
      if (!reward) {
        throw createError(404, "Reward not found.");
      }
      reward.user_id = contactId;
      await reward.save();
      if (rewardType === "vouchers") {
        user_sender.vouchers -= parsedRewardValue;
        const contact = await User.findById(contactId);
        contact.vouchers += parseInt(parsedRewardValue);
        await user_sender.save();
        await contact.save();
        res.json({
          vouchar: "Voucher sent successfully.",
          message: rewardType,
        });
      } else if (rewardType === "points") {
        user_sender.points -= parsedRewardValue;
        const contact = await User.findById(contactId);
        contact.points += parseInt(parsedRewardValue);
        await user_sender.save();
        await contact.save();
        res.json({
          vouchar: "Points sent successfully.",
          message: rewardType,
        });
      } else if (rewardType === "credits") {
        user_sender.credits -= parsedRewardValue;
        const contact = await User.findById(contactId);
        contact.credits += parseInt(parsedRewardValue);
        await user_sender.save();
        await contact.save();
        res.json({
          vouchar: "Credits sent successfully.",
          message: rewardType,
        });
      } else {
        res.json({
          message: "Please Enter your type (vouchers , credits , points)",
        });
      }
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid User id"));
        return;
      }
      next(error);
    }
  },
};
