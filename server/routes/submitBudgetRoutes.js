const mongoose = require("mongoose");

const Budget = mongoose.model("budget");
const Exp_Transaction = mongoose.model("transaction");

module.exports = (app) => {
  app.put(`/api/edit/transactions/:tripName/:user`, async (req, res) => {
    const { tripName, user } = req.params;
    console.log(tripName, user);
    try {
      const edited = await Exp_Transaction.update(
        {
          trip_name: tripName,
          user_ref_email: user,
        },
        { $set: { trip_name: req.body.trip_name } }
      );
      console.log(edited);

      res.status(200).send(edited);
    } catch (error) {
      res.status(500).send(error);
      console.log("SERVER ERROR");
    }
  });
  app.put(`/api/edit/card/:id`, async (req, res) => {
    try {
      const cardToEdit = await Budget.findById(req.params.id).exec();
      cardToEdit.set(req.body);
      const result = await cardToEdit.save();
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
      console.log("SERVER ERROR2");
    }
  });

  app.post(`/api/submit/info/card`, async (req, res) => {
    try {
      const CardToSubmit = await Budget.create(req.body);
      res.status(200).send(cardToEdit);
    } catch {
      res.status(500).send(error);
    }
  });

  app.delete(`/api/delete/Info/card/:id`, async (req, res) => {
    try {
      const id = req.params.id;
      await Budget.findByIdAndDelete(id);
      res.status(200).send({ message: "card with id:" + id + " been deleted" });
    } catch {
      res.status(500).send(error);
    }
  });
};
