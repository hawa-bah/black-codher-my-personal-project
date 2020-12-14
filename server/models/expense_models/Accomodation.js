const mongoose = require("mongoose");
const { Schema } = mongoose;

const AccomodationSchema = Schema({
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
});

mongoose.model("accomodation", AccomodationSchema, "accomodation");
