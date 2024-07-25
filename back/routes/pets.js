const express = require("express");

const router = express.Router();

const Cat = require("../models/cats");
const petsCtrl = require("../controllers/pets");

router.get("/lost/cats", petsCtrl.getAllLostCats);

module.exports = router;
