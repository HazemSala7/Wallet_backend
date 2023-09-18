const express = require("express");

const router = express.Router();

const PostController = require("../Controllers/Post.Controller");

//Get a list of all products
router.get("/", PostController.getAllPosts);

//Create a new product
router.post("/", PostController.createNewPost);

//Get a product by zone
router.get("/zone/:zone", PostController.findPostByZone);

//Get a product by id
router.get("/:id", PostController.findPostById);

//Update a product by id
router.patch("/:id", PostController.updateAPost);

//Delete a product by id
router.delete("/:id", PostController.deleteAPost);

module.exports = router;
