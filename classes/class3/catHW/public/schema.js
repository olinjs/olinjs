var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
});

var catSchema = mongoose.Schema({
	name: String,
	color: String,
	age: Number
})

var Cat = mongoose.model('Cat', catSchema);

module.exports.Cat = Cat