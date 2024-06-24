const express = require("express");
const mongoose = require("mongoose");
const { password, userName, clusterName, dbName } = require("./conf");
const app = express();

const Cat = require("./models/cats");

const dbURI = `mongodb+srv://${userName}:${password}@${clusterName}/${dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(dbURI)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.send("GET request to the homepage");
});

app.get("/lost/cats", async (req, res, next) => {
  try {
    const cats = await Cat.find();
    res.status(200).json(cats);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = app;
