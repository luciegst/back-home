const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.signup = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((existingUser) => {
      if (existingUser) {
        // If email is already in use, send a specific error message
        return res.status(400).json({
          error: { message: "Email is already in use", code: "email_in_use" },
        });
      }

      // If email is unique, proceed to hash the password and save the user
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hash,
          });
          user
            .save()
            .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
            .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {};
