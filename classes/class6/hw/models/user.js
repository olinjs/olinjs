var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	username: String,
	twits: Array
});

var User = mongoose.model('User', userSchema);

module.exports = User;