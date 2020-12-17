const mongoose = require("mongoose");
const { Schema } = mongoose;

const Budget = Schema({
  budgets: [
    {
      budget_category: String,
      budget_amount: Number,
      // spent_amount: Number,
    },
  ],
  trip_name: String,
});

mongoose.model("budget", Budget, "budget");
