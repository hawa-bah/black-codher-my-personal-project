const mongoose = require("mongoose");
const { Schema } = mongoose;

const AccomodationSchema = Schema({
  transaction_value: Number,
  description: String,
  transaction_date: {
    type: Date,
  },
});

mongoose.model("accomodation", AccomodationSchema, "accomodation");
