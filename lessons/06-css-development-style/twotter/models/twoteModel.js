var mongoose = require('mongoose');

var twoteSchema = mongoose.Schema({
	username: String,
	content: String,
	time: Number
});

module.exports = mongoose.model("Twotes", twoteSchema);

