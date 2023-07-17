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
  value: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  rewardId: {
    type: String,
    required: true,
  },
});

const Reward = mongoose.model("Reward", RewardSchema);

module.exports = Reward;
