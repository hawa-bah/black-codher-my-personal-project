const mongoose = require("mongoose");
const { Schema } = mongoose;

const Budget = Schema({
  budgets: [
    {
      budget_category: String,
      budget_amount: Number,
    },
  ],
  trip_name: String,
  date_added: {
    type: Date,
    default: new Date(),
  },
  user_ref_email: String,
});

mongoose.model("budget", Budget, "budget");
