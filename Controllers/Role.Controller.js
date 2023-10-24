const createError = require("http-errors");
const mongoose = require("mongoose");
const Role = require("../Models/Role.model");

module.exports = {
  getAllRoles: async (req, res, next) => {
    try {
      const results = await Role.find({}, { __v: 0 });
      res.status(200).json({
        roles: results,
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewRole: async (req, res, next) => {
    try {
      // Create a new Post document and set the post_id to the User's _id
      let role = new Role({
        type: req.body.type,
      });
      await role.save();
      res.status(200).json({
        message: "Role Added Successfully!",
        role_details: role,
      });
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        res.status(404).json({
          message: error.message,
        });
        return;
      }
      next(error);
    }
  },
};
