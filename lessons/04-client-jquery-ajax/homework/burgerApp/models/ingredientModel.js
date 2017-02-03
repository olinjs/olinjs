var mongoose = require('mongoose');

var ingredientSchema = mongoose.Schema({
	name: String,
	amount: Boolean,
	price: Number
});

module.exports = mongoose.model("Ingredients", ingredientSchema);

