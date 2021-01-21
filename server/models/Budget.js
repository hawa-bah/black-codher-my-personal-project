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
  // user_id: { type: Schema.Types.ObjectId, ref: "users" },
  user_ref_email: String,
});

mongoose.model("budget", Budget, "budget");
