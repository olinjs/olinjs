var mongoose = require('mongoose');

// create a schema
var robotSchema = mongoose.Schema({
	name: String,
	abilities: [String],
	isEvil: Boolean
});

module.exports = mongoose.model("robot", robotSchema);