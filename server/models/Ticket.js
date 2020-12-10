const mongoose = require("mongoose");
const { Schema } = mongoose;

const ticketShema = new Schema({
  ticket_name: String,
  date_created: {
    type: new Date(),
    default: Date.now,
  },
  description: String,
  sub_tasks: [String],
  ticket_img_url: String,
  web_url: [String],
});

mongoose.model("tickets", ticketShema);
