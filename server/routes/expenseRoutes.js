const mongoose = require("mongoose");

const Exp_Transaction = mongoose.model("transaction");
const Budget = mongoose.model("budget");

module.exports = (app) => {
  app.get(`/api/expense`, async (req, res) => {
    const transactions = await Exp_Transaction.find();
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

  app.post(`api/expense/food`, async (req, res) => {
    await Exp_Food.create(req.body);
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

  app.get(`/api/expenses/accomodation/:tripName`, async (req, res) => {
    const { tripName } = req.params;
    const spent = await Exp_Transaction.aggregate([
      { $match: { budget_category: "Accomodation", trip_name: tripName } },
      {
        $group: { _id: "", transaction_value: { $sum: "$transaction_value" } },
      },
    ]);

    return res.status(200).send(spent);
  });

  // >>>>>>>>>>>>>>>> amount spent in each category

  // attempt 1
  // app.get(`/api/expenses/:category/:tripName`, async (req, res) => {
  //   const { tripName } = req.params.tripName;
  //   const { category } = req.params.category;
  //   const spent = await Exp_Accomodation.aggregate([
  //     { $match: { budget_category: category, trip_name: tripName } },
  //     {
  //       $group: { _id: "", transaction_value: { $sum: "$transaction_value" } },
  //     },
  //   ]);

  //   return res.status(200).send(spent);
  // });

  // attempt 2
  app.get(`/api/expenses/:tripName`, async (req, res) => {
    const { tripName } = req.params;

    const spent = await Exp_Transaction.find({ trip_name: tripName });

    return res.status(200).send(spent);
  });
  //>>>>>>>>>>>>>>>>> for budgeting
  app.get(`/api/budget`, async (req, res) => {
    const budgets = await Budget.find({});
    return res.status(200).send(budgets);
  });

  app.post(`/api/budget`, async (req, res) => {
    await Budget.create(req.body);
  });

  app.get(`/api/budget/category/:tripName`, async (req, res) => {
    const { tripName } = req.params;
    // const { category } = req.params.category;
    const budget = await Budget.find({
      // budget_category: "Accomodation",
      trip_name: tripName,
    });
    console.log(budget);
    return res.status(200).send(budget);
  });
};
