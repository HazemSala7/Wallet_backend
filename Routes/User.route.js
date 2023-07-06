const express = require("express");
const router = express.Router();

const AuthControler = require("../Controllers/AuthController");

//Register
router.post("/register", AuthControler.register);
//Login
router.post("/login", AuthControler.login);

module.exports = router;
