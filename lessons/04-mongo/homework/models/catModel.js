var mongoose = require('mongoose');

//creratet a schema
var catSchema = mongoose.Schema({
	name: String,
	age: Number,
	colors: [String]
});

module.exports = mongoose.model('Cat', catSchema);