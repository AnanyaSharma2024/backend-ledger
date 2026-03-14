const express = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");
const accountController = require("../controller/account.controller");

const router = express.Router();

// POST /api/accounts/create
router.post("/create", authMiddleware, accountController.createAccountController);

// GET /api/accounts/
router.get("/", authMiddleware, accountController.getUserAccountsController);

// GET /api/accounts/balance/:accountId
router.get("/balance/:accountId", authMiddleware, accountController.getAccountBalanceController);

// GET /api/accounts/:id
router.get("/:id", authMiddleware, accountController.getAccountByIdController);

module.exports = router;