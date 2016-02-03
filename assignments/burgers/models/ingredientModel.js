var mongoose = require('mongoose');

var ingredientSchema = mongoose.Schema({
  name: String,
  price: Number, 
  inStock: {type: Boolean, default: true},
});

module.exports = mongoose.model("ingredient", ingredientSchema); 