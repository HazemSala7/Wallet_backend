const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  published_by: {
    type: String,
    required: true,
  },
  needed: {
    type: String,
    required: true,
  },
  quantity_needed: {
    type: String,
    required: true,
  },
  category_type: {
    type: String,
    required: true,
  },
  lattiude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  date_from: {
    type: Date,
    required: true,
  },
  date_to: {
    type: Date,
    required: true,
  },
  time_from: {
    type: String,
    required: true,
  },
  time_to: {
    type: String,
    required: true,
  },
  reward: {
    type: String,
    required: true,
  },
  quantity_reward: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

const Event = mongoose.model("event", EventSchema);
module.exports = Event;
