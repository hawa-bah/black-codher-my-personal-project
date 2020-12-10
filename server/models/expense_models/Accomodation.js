const mongoose = require("mongoose");
const { Schema } = mongoose;

const AccomodationSchema = Schema({
  transaction_value: Number,
  description: String,
  // transaction_date: {
  //   type: Date,
  //   default: Date.now,
  // },
});

mongoose.model("accomodation", AccomodationSchema, "accomodation");
