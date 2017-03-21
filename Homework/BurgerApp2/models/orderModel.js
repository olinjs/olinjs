var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
  ingredients: Array,
  price: Number
});

module.exports = mongoose.model('Order', orderSchema);