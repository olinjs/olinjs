var mongoose = require('mongoose');

// DB Schema
var catSchema = mongoose.Schema({
	name: String,
	color: [String],
	age: Number
});

var Cat = mongoose.model('Cat', catSchema);