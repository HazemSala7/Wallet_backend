const express = require("express");
const router = express.Router();

const ActivityController = require("../Controllers/Activity.Controller");

//Get a list of all products
router.get("/", ActivityController.getAllActivities);

//Create a new product
router.post("/", ActivityController.createNewActivity);

//Get a product by id
router.get("/:id", ActivityController.findActivityById);

//Get a product by zone
router.get("/zone/:zone", ActivityController.findActivityByZone);

//Update a product by id
router.patch("/:id", ActivityController.updateAActivity);

//Delete a product by id
router.delete("/:id", ActivityController.deleteAActivity);

module.exports = router;
