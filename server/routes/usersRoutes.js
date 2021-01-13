const mongoose = require("mongoose");
// const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// importing input validation
const validateRegistrationInput = require("../auth/validation/register");
const validateLoginInput = require("../auth/validation/login");

const User = mongoose.model("users");

module.exports = (app) => {
  app.post("http://localhost:5000/api/register", (req, res) => {
    // destructuring the return of the imported function
    const { errors, isValid } = validateRegistrationInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        // creating new user
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });

        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    });
  });

  app.post(`/login`, (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then((user) => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
      // Check password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name,
          };
          // Sign token
          jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {
              expiresIn: 31556926, // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });
};
