var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/HamburgerShopDatabase');

//Schema
var ingredientSchema = mongoose.Schema({
  name: String,
  price: Number,
  stock: Boolean
});

var orderSchema = mongoose.Schema({
  ingredients: [String],
  price: Number
});

module.exports = {
	orderModel: mongoose.model("order", orderSchema),
	ingredientsModel: mongoose.model("ingredient", ingredientSchema)
} 