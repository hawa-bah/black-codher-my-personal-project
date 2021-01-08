const { response } = require("express");
const mongoose = require("mongoose");

const Budget = mongoose.model("budget");

module.exports = (app) => {
  app.put(`/api/edit/card/:id`, async (req, res) => {
    try {
      const cardToEdit = await Budget.findById(request.params.id).exec();
      cardToEdit.set(req.body);
      const result = await cardToEdit.save();
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });
};
