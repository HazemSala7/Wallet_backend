const express = require("express");
const router = express.Router();

const LikeController = require("../Controllers/Like.Controller");

//Get a list of all products
router.get("/", LikeController.getAllLikes);

//Create a new product
router.post("/", LikeController.createNewLike);

//Get a product by id
router.get("/:id", LikeController.findLikeById);

//Update a product by id
router.patch("/:id", LikeController.updateALike);

//Delete a product by id
router.delete("/:id", LikeController.deleteALike);

module.exports = router;
