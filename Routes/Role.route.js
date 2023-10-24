const express = require("express");
const router = express.Router();

const RoleController = require("../Controllers/Role.Controller");

//Get a list of all products
router.get("/", RoleController.getAllRoles);

//Create a new product
router.post("/", RoleController.createNewRole);

module.exports = router;
