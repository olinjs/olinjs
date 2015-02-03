var mongoose = require("mongoose");

var ingredientSchema = mongoose.Schema({
	name: String,
	price: Number,
	stock: Boolean
});

module.exports = mongoose.model('Ingredient', ingredientSchema);

