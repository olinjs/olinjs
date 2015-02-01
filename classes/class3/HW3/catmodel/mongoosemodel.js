var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	name: String,
	age: Number,
	color: [String]
});

var Cat = mongoose.model('Cat', userSchema);

module.exports = Cat;