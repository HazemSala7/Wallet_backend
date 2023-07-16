const mongoose = require("mongoose");

const RewardSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rewardId: {
    type: Number,
    required: true,
  },
});

const Reward = mongoose.model("Reward", RewardSchema);

module.exports = Reward;
