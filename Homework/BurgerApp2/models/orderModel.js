var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
  ingredients: Array,
  price: Number,
  completed: Boolean
});

module.exports = mongoose.model('Order', orderSchema);