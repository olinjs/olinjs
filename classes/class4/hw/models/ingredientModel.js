var mongoose = require('mongoose');

var ingredientSchema = mongoose.Schema({
	name: String,
	price: Number,
	available: String
});

module.exports = ingredientSchema;