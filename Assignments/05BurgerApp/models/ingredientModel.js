var mongoose = require('mongoose');

var ingredientSchema = mongoose.Schema({
	name: String,
	price: Number,
	outofstock: Boolean
});

module.exports = mongoose.model('ingredientSchema', ingredientSchema);