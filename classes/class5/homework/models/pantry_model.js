mongoose = require('mongoose');

var ingredientSchema = mongoose.Schema({
    name: String,
    stock: Number,
    price: Number
});

var pantrySchema = mongoose.Schema({
    owner: String,
    ingredients: [ingredientSchema]
});

module.exports.pantry = mongoose.model('pantry',pantrySchema);
module.exports.ingredient = mongoose.model('ingredient',ingredientSchema);
