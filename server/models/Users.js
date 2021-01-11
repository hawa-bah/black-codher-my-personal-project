const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  location: String,
});

mongoose.model("users", userSchema);
