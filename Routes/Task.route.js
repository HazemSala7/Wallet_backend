const express = require("express");
const router = express.Router();

const TaskController = require("../Controllers/Task.Controller");

//Get a list of all products
router.get("/", TaskController.getAllTasks);

//Create a new product
router.post("/", TaskController.createNewTask);

//Get a product by id
router.get("/:id", TaskController.findTaskById);

//Update a product by id
router.patch("/:id", TaskController.updateATask);

//Delete a product by id
router.delete("/:id", TaskController.deleteATask);

module.exports = router;
