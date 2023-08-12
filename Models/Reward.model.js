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
  status: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  sender_id: {
    type: String,
  },
  receiver_id: {
    type: String,
    required: true,
  },
});

const Reward = mongoose.model("Reward", RewardSchema);

module.exports = Reward;
