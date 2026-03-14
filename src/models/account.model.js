const mongoose = require("mongoose");
const ledgerModel = require("./ledger.model");

const accountSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
    index: true
  },

  name: {
    type: String,
    required: [true, "Account name is required"]
  },

  balance: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    enum: {
      values: ["ACTIVE", "FROZEN", "CLOSED"],
      message: "Status must be either ACTIVE, FROZEN, or CLOSED"
    },
    default: "ACTIVE"
  },

  currency: {
    type: String,
    required: [true, "Currency is required"],
    default: "INR"
  }

}, { timestamps: true });


// unique account name per user
accountSchema.index({ user: 1, name: 1 }, { unique: true });


// get account balance from ledger
accountSchema.methods.getBalance = async function () {

  const balanceData = await ledgerModel.aggregate([
    { $match: { account: this._id } },

    {
      $group: {
        _id: null,
        totalDebit: {
          $sum: {
            $cond: [{ $eq: ["$type", "DEBIT"] }, "$amount", 0]
          }
        },
        totalCredit: {
          $sum: {
            $cond: [{ $eq: ["$type", "CREDIT"] }, "$amount", 0]
          }
        }
      }
    },

    {
      $project: {
        _id: 0,
        balance: { $subtract: ["$totalCredit", "$totalDebit"] }
      }
    }

  ]);

  return balanceData.length ? balanceData[0].balance : 0;
};



const accountModel = mongoose.model("Account", accountSchema);

module.exports =  accountModel ;