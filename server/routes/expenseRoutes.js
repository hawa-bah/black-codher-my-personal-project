const mongoose = require("mongoose");

const Exp_Transaction = mongoose.model("transaction");
const Budget = mongoose.model("budget");

module.exports = (app) => {
  // used
  app.get(`/api/expense/:ref`, async (req, res) => {
    const { ref } = req.params;
    const transactions = await Exp_Transaction.find({ user_ref_email: ref });
    return res.status(200).send(transactions);
  });

  app.get(`/api/balance`, async (req, res) => {
    const balance = await Exp_Transaction.aggregate([
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
    const expense = await Exp_Transaction.create(req.body);

    return res.status(201).send({
      error: false,
      expense,
    });
  });

  app.delete(`/api/expenses/transactions/:id`, async (req, res) => {
    const { id } = req.params;

    const transactions = await Exp_Transaction.findByIdAndDelete(id);
    console.log(transactions);
    return res.status(202).send({
      error: false,
      transactions,
    });
  });

  // /used
  app.get(`/api/expenses/:tripName/:ref`, async (req, res) => {
    const { tripName, ref } = req.params;

    const spent = await Exp_Transaction.find({
      trip_name: tripName,
      user_ref_email: ref,
    });

    return res.status(200).send(spent);
  });

  //>>>>>>>>>>>>>>>>> for budgeting
  // /used
  app.get(`/api/budget/:ref`, async (req, res) => {
    const ref = req.params.ref;
    const budgets = await Budget.find({ user_ref_email: ref });
    return res.status(200).send(budgets);
  });

  // /used
  app.post(`/api/budget`, async (req, res) => {
    await Budget.create(req.body);
  });

  // /used
  app.get(`/api/budget/category/:tripName/:ref`, async (req, res) => {
    const { tripName, ref } = req.params;

    const budget = await Budget.find({
      trip_name: tripName,
      user_ref_email: ref,
    });
    console.log(budget);
    return res.status(200).send(budget);
  });
};
