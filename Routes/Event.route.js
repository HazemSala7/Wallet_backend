const express = require("express");
const router = express.Router();

const EventController = require("../Controllers/Event.Controller");

//Get a list of all products
router.get("/", EventController.getAllEvents);

//Create a new product
router.post("/", EventController.createNewEvent);

//Get a product by id
router.get("/:id", EventController.findEventById);

//Get a product by zone
router.get("/zone/:zone", EventController.findActivityByZone);

//Update a product by id
router.patch("/:id", EventController.updateAEvent);

//Delete a product by id
router.delete("/:id", EventController.deleteAEvent);

module.exports = router;
