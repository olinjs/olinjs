var mongoose = require('mongoose');

var ingredientSchema = mongoose.Schema({
	name: String,
	price: Number,
	available: String
});
var Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;