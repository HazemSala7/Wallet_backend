const express = require("express");
const router = express.Router();

const WaitingListController = require("../Controllers/WaitingList.Controller");

//Get a list of all products
router.get("/", WaitingListController.getAllWaitingLists);

//Create a new product
router.post("/", WaitingListController.createNewWaitingList);

//Get a product by id
router.get("/:id", WaitingListController.findWaitingListById);

//Get a product by id
router.get("/by_task/:task_id", WaitingListController.findWaitingListsByTaskID);

//Get a product by id
router.get(
  "/by_event/:event_id",
  WaitingListController.findWaitingListsByEventID
);

//Update a product by id
router.patch("/:id", WaitingListController.updateAWaitingList);

//Delete a product by id
// router.delete("/", WaitingListController.deleteALike);

module.exports = router;
