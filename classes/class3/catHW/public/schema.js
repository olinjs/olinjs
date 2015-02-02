var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {});

var catSchema = mongoose.Schema({
	name: String,
	colors: [String],
	age: Number
});

var Cat = mongoose.model('Cat', catSchema);

module.exports.Cat = Cat;