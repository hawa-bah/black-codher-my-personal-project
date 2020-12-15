const mongoose = require("mongoose");
const { Schema } = mongoose;

const Budget = Schema({
  budget_category: String,
  budget_amount: String,
});

mongoose.model("budget", Budget, "budget");
