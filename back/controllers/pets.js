const Cat = require("../models/cats");

exports.getAllLostCats = async (req, res, next) => {
  try {
    const cats = await Cat.find();
    res.status(200).json(cats);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
