const mongoose = require("mongoose");
const { Schema } = mongoose;

const TrasportSchema = new Schema({
  transaction_value: Number,
  description: String,
  transaction_date: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model("exp_transport", TrasportSchema);
