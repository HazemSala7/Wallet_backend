const express = require("express");
const router = express.Router();

const RewardController = require("../Controllers/Reward.Controller");

//Get a list of all products
router.get("/", RewardController.getAllRewards);

//Create a new product
router.post("/", RewardController.createNewReward);

//Get a product by id
router.get("/user/:id", RewardController.findRewardByUserId);

//Get a product by id
router.post("/rewards", RewardController.findRewardByIds);

//Get a product by id
router.get("/:id", RewardController.findRewardById);

//Update a product by id
router.patch("/:id", RewardController.updateAReward);

//Delete a product by id
router.delete("/:id", RewardController.deleteAReward);

module.exports = router;
