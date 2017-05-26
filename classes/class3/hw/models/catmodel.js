mongoose = require('mongoose');

var catSchema = mongoose.Schema({
	  name: String,
	  age: Number,
	  colorlist: [String]
});

var Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;