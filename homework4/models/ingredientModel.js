var mongoose = require('mongoose');

// Create a Schema
var ingredientSchema = mongoose.Schema({
  name: String,
  price: Number,
  inStock: Boolean,
});

var Ingredient = mongoose.model("ingredient", ingredientSchema);

module.exports = Ingredient;
