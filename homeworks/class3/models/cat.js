var mongoose = require('mongoose');

var catSchema = mongoose.Schema({
	age: Number,
	name: String,
	colors: [String]
});

module.exports = mongoose.model('Cat', catSchema);