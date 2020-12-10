const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  location: String,
});

// LOOK AT EXAMPLE QUICK START: if I want to add a method with functionality add it in here before the model
mongoose.model("users", userSchema);
// "users name of the collections"
