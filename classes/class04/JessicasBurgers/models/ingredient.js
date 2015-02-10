// Ingredient Schema.
// Used to store a burger ingredient.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IngredientSchema = new Schema({
	name: String,
	price: Number,
	instock: Boolean
});

module.exports = mongoose.model('ingredient', IngredientSchema);

// Also export the Schema so that we can later have embedded ingredients in orders.
module.exports.IngredientSchema = IngredientSchema;