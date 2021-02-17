const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const path = require("path");

// IMPORT YOUR MODELS
require("./models/Users");
require("./models/Transaction");
require("./models/Budget");

const app = express();
app.use(cors());

mongoose
  .connect(
    process.env.MONGODB_URI ||
      `mongodb+srv://HawaBah:password25@cluster0.9kfx5.mongodb.net/black-codher-personal-project?retryWrites=true&w=majority`,
    // `mongodb://localhost:27017/black-codher-personal-project`,
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
app.use(passport.initialize());

require("./auth/config/passport")(passport);

// IMPORT YOUR ROUTES
require("./routes/usersRoutes")(app);
require("./routes/expenseRoutes")(app);
require("./routes/submitBudgetRoutes")(app);

const PORT = process.env.PORT || 5000;

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }

app.use(express.static(path.resolve(__dirname, "../client/build")));

// in production devdependecies are not installed

// Handles any requests that don't match the ones above, sends them to index.html and checks the other routes which I have created already
// app.get("*", (req, res) => {
//   console.log(__dirname);
//   res.sendFile(path.join(__dirname + "/client/build/index.html"));
// });

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
