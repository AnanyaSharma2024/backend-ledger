const mongoose = require("mongoose");
// Account model to represent user accounts in the ledger system
const accountSchema = new mongoose.Schema({
// Reference to the user who owns the account
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
    index: true
  },
// Name of the account (e.g., "Savings", "Checking")
  name: {
    type: String,
    required: [true, "Account name is required"]
  },
// Status of the account (e.g., "ACTIVE", "FROZEN", "CLOSED")
  status: {
    type: String,
    enum: {
      values: ["ACTIVE", "FROZEN", "CLOSED"],
      message: "Status must be either ACTIVE, FROZEN, or CLOSED"
    },
    default: "ACTIVE"
  },
// Currency of the account (e.g., "USD", "INR")
  currency: {
    type: String,
    required: [true, "Currency is required"],
    default: "INR"
  }
// Timestamps for createdAt and updatedAt
}, { timestamps: true });

// Compound index to ensure unique account names per user
accountSchema.index({ user: 1, name: 1 }, { unique: true });

// Create the Account model
const accountModel = mongoose.model("Account", accountSchema);

module.exports = accountModel;