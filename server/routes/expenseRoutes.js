const mongoose = require("mongoose");

const Exp_Accomodation = mongoose.model("accomodation");

module.exports = (app) => {
  app.post(`/api/expense`, async (req, res) => {
    const expense = await Exp_Accomodation.create(req.body);

    return res.status(201).send({
      error: false,
      expense,
    });
  });
};
