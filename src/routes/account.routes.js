const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const accountController = require("../controller/account.controller");

const router = express.Router();

//api/accounts/create
router.post("/create", authMiddleware, accountController.createAccountController);

module.exports = router;