const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  type: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
  },
});

const Role = mongoose.model("role", RoleSchema);
module.exports = Role;
