const express = require("express");
const router = express.Router();

const AuthControler = require("../Controllers/AuthController");

router.post("/register", AuthControler.register);
router.post("/login", AuthControler.login);
router.get("/users", AuthControler.getAllUsers);
router.get("/:id", AuthControler.getUserById);
router.post("/add/:userId", AuthControler.addFriendById);
router.delete("/:userId", AuthControler.deleteUserById);
router.post("/users/data", AuthControler.getUsersData);

module.exports = router;
