var mongoose = require('mongoose');

var Twits = mongoose.Schema({
	timeMade: Number,
	text: String
})

var userSchema = mongoose.Schema({
	username: String,
	twits: [Twits]
});

var User = mongoose.model('User', userSchema);

module.exports = User;