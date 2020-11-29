const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = (app) => {
  app.get(`/api/user`, async (req, res) => {
    let persons = await User.find();
    return res.status(200).send(persons);
  });

  app.post(`/api/user`, async (req, res) => {
    let user = await User.create(req.body);
    return res.status(201).send({
      error: false,
      user,
    });
  });

  app.put(`/api/user/:id`, async (req, res) => {
    const { id } = req.params;

    let user = await User.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
      error: false,
      user,
    });
  });

  app.delete(`/api/user/:id`, async (req, res) => {
    const { id } = req.params;

    let user = await User.findByIdAndDelete(id);

    return res.status(202).send({
      error: false,
      user,
    });
  });
};
