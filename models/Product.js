const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  ref: String,
  sizes: Number,
  description: String,
  category: String,
  price: Number,
  img: String,
  id_tags: String
});

const product = mongoose.model("product", productSchema);
module.exports = product;
