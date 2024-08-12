const express = require("express");
const mongoose = require("mongoose");
const { password, userName, clusterName, dbName } = require("./conf");
const bodyParser = require("body-parser");
const app = express();

const petsRoutes = require("./routes/pets");
const userRoutes = require("./routes/user");

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
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("GET request to the homepage");
});

app.use("/api/", petsRoutes);
app.use("/api/", userRoutes);

module.exports = app;
