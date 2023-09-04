const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  contact_name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
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
  indoor_location: {
    type: String,
    required: true,
  },
  category_type: {
    type: String,
    required: true,
  },
  task_type: {
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
  start_date: {
    type: String,
    required: true,
  },
  end_date: {
    type: String,
    required: true,
  },
  time: {
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
  file: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  zone: {
    type: String,
    required: true,
  },
});

const Task = mongoose.model("task", TaskSchema);
module.exports = Task;
