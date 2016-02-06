var mongoose = require('mongoose');


var ingredientSchema = mongoose.Schema({
  name: String,
  price: Number, 
  inStock: {type: Boolean, default: true},
  //inStock: Boolean,
});


module.exports = mongoose.model("ingredient", ingredientSchema); 
//module.exports = mongoose.model("order", orderSchema); 