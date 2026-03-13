const accountModels = require("../models/account.model");

async function createAccountController(req, res) {

    const user = req.user;
    const { name, currency } = req.body;

    const account = await accountModels.create({
        user: user._id,
        name,
        currency,
        balance: 0
    });

    res.status(201).json({
        message: "Account created successfully",
        account
    });
}

async function getUserAccountsController(req, res) {

    const accounts = await accountModels.find({
        user: req.user._id
    });

    res.json({
        accounts
    });
}

async function getAccountBalanceController(req, res) {
    const { accountId } = req.params;
    const account = await accountModels.findOne({
        _id: accountId,
        user: req.user._id
    });
    if (!account) {
        return res.status(404).json({
            message: "Account not found"
        });
    }
    const balance = await account.getBalance();
    res.status(200).json({
        accountId,
        balance
    });
}

async function getAccountByIdController(req, res) {

    const account = await accountModels.findById(req.params.id);

    if (!account) {
        return res.status(404).json({
            message: "Account not found"
        });
    }

    res.json({
        account
    });
}

module.exports = {
    createAccountController,
    getUserAccountsController,
    getAccountBalanceController,
    getAccountByIdController
};