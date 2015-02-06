var mongoose = require('mongoose');
var orderSchema = mongoose.Schema({
	ingredients: Array
});

var Order = mongoose.model('Order', orderSchema);
module.exports = Order;