const express = require("express");
const router = express.Router();

const OperationController = require("../Controllers/Operation.Controller");

//Update an operation
router.post("/send_operation", OperationController.sendVouchars);

module.exports = router;
