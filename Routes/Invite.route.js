const express = require("express");
const router = express.Router();

const InviteController = require("../Controllers/Invite.Controller");

//Get a list of all products
router.get("/", InviteController.getAllInvites);

//Create a new product
router.post("/", InviteController.createNewInvite);

//Get a product by id
router.get("/:id", InviteController.findInviteById);

module.exports = router;
