const { Router } = require("express");
const mongoose = require("mongoose");
const { authMiddleware } = require("../middleware/auth.middleware");
const ledgerModel = require("../models/ledger.model");

const transactionRouter = Router();


// POST /api/transactions/system/initial-funds
transactionRouter.post("/system/initial-funds", authMiddleware, async (req, res) => {

    const { toAccount, amount } = req.body;

    try {

        const ledgerEntry = await ledgerModel.create({
            account: toAccount,
            amount: amount,
            type: "CREDIT",
            transaction: new mongoose.Types.ObjectId()
        });

        res.json({
            message: "Initial funds added successfully",
            ledger: ledgerEntry
        });

    } catch (error) {

        res.status(500).json({
            message: "Error creating ledger entry",
            error: error.message
        });

    }

});

module.exports = transactionRouter;