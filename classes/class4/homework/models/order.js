var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
  name: String,
  age: Number,
  color: [String]
});

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;