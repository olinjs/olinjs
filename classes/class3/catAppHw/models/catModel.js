var mongoose = require("mongoose");

var catSchema = mongoose.Schema({
	name: String,
	age: Number,
	colors: [String]
});

module.exports = mongoose.model('Cat', catSchema);


