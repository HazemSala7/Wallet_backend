const createError = require("http-errors");
const mongoose = require("mongoose");
const User = require("../Models/User");

module.exports = {
  sendVouchars: async (req, res, next) => {
    try {
      const type = req.body.type;
      const user_sender = await User.findById(req.body.user_id);
      // const product = await Product.findOne({ _id: id });
      if (!user_sender) {
        throw createError(404, "User does not exist.");
      }
      if (type === "vouchars") {
        user_sender.vouchars -= req.body.value;
        await user_sender.save();
        const contact = await User.findById(req.body.contact_id);
        contact.vouchars += parseInt(req.body.value);
        await contact.save();
        res.json({
          vouchar: "Voucher sent successfully.",
          message: type,
        });
      } else if (type === "points") {
        user_sender.points -= req.body.value;
        await user_sender.save();
        const contact = await User.findById(req.body.contact_id);
        contact.points += parseInt(req.body.value);
        await contact.save();
        res.json({
          vouchar: "Points sent successfully.",
          message: type,
        });
      } else if (type === "credits") {
        user_sender.credits -= req.body.value;
        await user_sender.save();
        const contact = await User.findById(req.body.contact_id);
        contact.credits += parseInt(req.body.value);
        await contact.save();
        res.json({
          vouchar: "Credits sent successfully.",
          message: type,
        });
      } else {
        res.json({
          message: "Please Enter your type (vouchars , credits , points)",
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
