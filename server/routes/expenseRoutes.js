const mongoose = require("mongoose");

const Exp_Accomodation = mongoose.model("accomodation");
const Exp_Food = mongoose.model("food");

module.exports = (app) => {
  app.post(`/api/expense`, async (req, res) => {
    const expense = await Exp_Accomodation.create(req.body);

    return res.status(201).send({
      error: false,
      expense,
    });
  });

  app.post(`api/expense/food`, async (req, res) => {
    await Exp_Food.create(req.body);
  });
};
