const express = require("express");
const router = express.Router();

const WaitingListController = require("../Controllers/WaitingList.Controller");

//Get a list of all products
router.get("/", WaitingListController.getAllWaitingLists);

//Create a new product
router.post("/", WaitingListController.createNewWaitingList);

//Get a product by id
router.get("/:id", WaitingListController.findWaitingListById);

//Update a product by id
router.patch("/:id", WaitingListController.updateALike);

//Delete a product by id
// router.delete("/", WaitingListController.deleteALike);

module.exports = router;
