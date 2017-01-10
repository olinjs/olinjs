var mongoose = require('mongoose');

var catSchema = mongoose.Schema({
	name: String,
	age: Number,
	color: Array
});

module.exports = mongoose.model('catSchema', catSchema);