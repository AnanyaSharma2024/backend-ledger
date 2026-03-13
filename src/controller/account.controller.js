const accountModels = require("../models/account.model");

async function createAccountController(req, res) {

    const user = req.user;
    const { name, currency } = req.body;

    const account = await accountModels.create({
        user: user._id,
        name,
        currency
    });

    res.status(201).json({
        message: "Account created successfully",
        account
    });
}

module.exports = {
    createAccountController
};