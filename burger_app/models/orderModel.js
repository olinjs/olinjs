var mongoose = require('mongoose');

// Create a Schema
var orderSchema = mongoose.Schema({
  ingredients: [String],
  price: Number,
});

var order = mongoose.model("order", orderSchema);

module.exports = order;
