const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// IMPORT YOUR MODELS
require("./models/Users");
require("./models/expense_models/Transaction");
require("./models/Budget");

const app = express();

mongoose.Promise = global.Promise;
mongoose
  .connect(
    process.env.MONGODB_URI ||
      `mongodb://localhost:27017/black-codher-personal-project`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB has been connected"))
  .catch((err) => console.log(err));

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// IMPORT YOUR ROUTES
require("./routes/usersRoutes")(app);
require("./routes/expenseRoutes")(app);
require("./routes/submitBudgetRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
