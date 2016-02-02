var mongoose = require('mongoose');

var ingredientSchema = mongoose.Schema({
  name: String,
  price: Number, 
});

module.exports = mongoose.model("ingredient", ingredientSchema); 