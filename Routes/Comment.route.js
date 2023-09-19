const express = require("express");
const router = express.Router();

const CommentController = require("../Controllers/Comment.Controller");

//Get a list of all products
router.get("/", CommentController.getAllComment);

//Create a new product
router.post("/", CommentController.createNewComment);

//Get a product by post_id
router.get(
  "/comments_by_postid/:post_id",
  CommentController.findCommentsByPostid
);

//Get a product by id
router.get("/:id", CommentController.findCommentById);

//Update a product by id
router.patch("/:id", CommentController.updateAComment);

//Delete a product by id
router.delete("/:id", CommentController.deleteAComment);

module.exports = router;
