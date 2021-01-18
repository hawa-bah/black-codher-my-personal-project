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
  // submit id of the cureent user too
  //also display depending on the user (if it matches the current user) if statement
});

mongoose.model("budget", Budget, "budget");
