var mongoose = require('mongoose');

var schema =  mongoose.Schema({
	name: { type: String, unique: true },
	price: { type: Number, default: 1.00, min: 0 },
	quantity: { type: Number, default: 100, min: 0 }
});

module.exports = mongoose.model('Ingredient', schema);