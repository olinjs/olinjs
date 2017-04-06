var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = mongoose.Schema({
	username: String,
	password: String
});

userSchema.plugin(findOrCreate);
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Users", userSchema);

