const mongoose = require("mongoose");
const { Schema } = mongoose;

const FoodSchema = Schema({
  transaction_value: Number,
  description: String,
  // transaction_date: {
  //   type: Date,
  //   default: Date.now,
  // },
});

mongoose.model("food", FoodSchema, "food");
