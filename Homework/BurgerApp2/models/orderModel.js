var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
  ingredients: Array,
});

module.exports = mongoose.model('Order', orderSchema);