const mongoose = require("mongoose");

const catsSchema = mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  description: { type: String, required: true },
  image_url: { type: String, required: true },
  color: { type: String, required: true },
  department_number: { type: Number, required: false },
  breed: { type: String, required: false },
});

module.exports = mongoose.model("Cat", catsSchema);
