var mongoose = require('mongoose');

var catSchema = mongoose.Schema({
	age: Number,
	name: String,
	color: [String]
});

var DatabaseCat = mongoose.model('DatabaseCat', catSchema);

module.exports = DatabaseCat;