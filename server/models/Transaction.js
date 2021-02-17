const mongoose = require("mongoose");
const { Schema } = mongoose;

const TransactionSchema = Schema({
  transaction_value: Number,
  description: String,
  transaction_date: {
    type: Date,
    default: new Date(),
    required: true,
  },
  budget_category: {
    type: String,
    required: true,
  },
  trip_name: String,
  user_ref_email: {
    type: String,
    required: true,
  },
});

mongoose.model("transaction", TransactionSchema, "transaction");
