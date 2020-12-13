const mongoose = require("mongoose");

const Exp_Accomodation = mongoose.model("accomodation");
const Exp_Food = mongoose.model("food");

module.exports = (app) => {
  app.get(`/api/expense`, async (req, res) => {
    const transactions = await Exp_Accomodation.find();
    return res.status(200).send(transactions);
  });

  app.get(`/api/balance`, async (req, res) => {
    const balance = await Exp_Accomodation.aggregate([
      { $match: { description: "test" } },
      {
        $group: { _id: "", transaction_value: { $sum: "$transaction_value" } },
      },
    ]);
    console.log(balance);
    return res.status(200).send(balance);
    // console.log(res);
  });
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

  app.delete(`/api/expenses/transactions/:id`, async (req, res) => {
    // const transactions = await Exp_Accomodation.findByIdAndDelete(
    //   req.params.id
    // );
    const { id } = req.params;

    const transactions = await Exp_Accomodation.findByIdAndDelete(id);

    return res.status(202).send({
      error: false,
      transactions,
    });
  });
};
