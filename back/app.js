const express = require("express");

const app = express();

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

app.get("/lost/cats", (req, res, next) => {
  const cats = [
    {
      _id: "oeihfzeoi",
      name: "Loupiau",
      gender: "male",
      imageUrl: "",
      color: "brown",
      description: "qsomihvqios",
      department_number: 53,
    },
    {
      _id: "oeihfzeoi",
      name: "Loupiau",
      gender: "male",
      imageUrl: "",
      color: "brown",
      description: "qsomihvqios",
      department_number: 53,
    },
  ];
  res.status(200).json(cats);
});

module.exports = app;
