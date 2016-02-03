var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/HamburgerShopDatabase');

//Schema
var ingredientSchema = mongoose.Schema({
  name: String,
  price: Number,
  stock: Boolean
});

module.exports = mongoose.model("ingredient", ingredientSchema);