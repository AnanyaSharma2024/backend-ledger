const { Router } = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");

const transactionRouter = Router();


// POST /api/transactions/create
transactionRouter.post("/create", authMiddleware, (req, res) => {
    res.json({
        message: "Transaction created successfully"
    });
});


// POST /api/transactions/system/initial-funds
transactionRouter.post("/system/initial-funds", authMiddleware, (req, res) => {
    res.json({
        message: "Initial funds added successfully"
    });
});


module.exports = transactionRouter;