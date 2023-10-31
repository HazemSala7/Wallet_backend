const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InviteSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  reward: {
    type: String,
    enum: ["vouchers", "points", "credits"],
  },
  role: {
    type: String,
    enum: ["user", "community_member", "admin"],
    default: "user",
    required: true,
  },
  note: {
    type: String,
  },
});

const Invite = mongoose.model("invite", InviteSchema);
module.exports = Invite;
