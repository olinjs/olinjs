var mongoose = require('mongoose');

var schema =  mongoose.Schema({
	ingredients: [mongoose.Schema.ObjectId]
});

module.exports = mongoose.model('Ingredient', schema);