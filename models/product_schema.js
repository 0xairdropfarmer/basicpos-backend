const mongoose = require("mongoose");
const schema = mongoose.Schema({
  name: String,
  stock: Number,
  price: Number,
  image: String,
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("product", schema);
