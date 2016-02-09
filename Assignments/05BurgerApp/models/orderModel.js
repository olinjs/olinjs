var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
  name: String,
  ingredients: Array,
  price: Number
});

module.exports = mongoose.model('orderSchema', orderSchema);