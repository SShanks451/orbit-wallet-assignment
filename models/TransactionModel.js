import mongoose, { Schema } from "mongoose";

const transactionSchema = mongoose.Schema({
  status: {
    type: String,
    enum: ["Success", "Pending", "Failed"],
    required: true,
  },

  type: {
    type: String,
    enum: ["Debit", "Credit"],
    required: true,
  },

  transactionDate: {
    type: Date,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  userId: {
    type: String,
    ref: "User",
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
