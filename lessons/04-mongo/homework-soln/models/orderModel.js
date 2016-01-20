var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
	customer: String,
	ingredients: Array,
	ingredientStr: String
});

module.exports = mongoose.model('Order', orderSchema);