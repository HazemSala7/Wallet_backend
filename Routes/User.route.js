const express = require("express");
const router = express.Router();

const AuthController = require("../Controllers/AuthController");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/users", AuthController.getAllUsers);
router.get("/current", AuthController.getCurrentUser);
router.get("/:id", AuthController.getUserById);
router.post("/add/:userId", AuthController.addFriendById);
router.put("/:id", AuthController.editUserById);
router.delete("/:userId", AuthController.deleteUserById);
router.post("/users/data", AuthController.getUsersData);

module.exports = router;
