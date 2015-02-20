//Sets up MongoDB, including Ingredients and Order models

var mongoose = require('mongoose');

var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
mongoose.connect(mongoURI);


var twoteSchema = mongoose.Schema({
username: String,
text: String,
userid: String
});

module.exports.Twotes = mongoose.model('Twotes',twoteSchema);

var userSchema = mongoose.Schema({
username: String,
password: String
});

module.exports.Users = mongoose.model('Users',userSchema);

var facebookSchema = mongoose.Schema({
oauthID: Number,
username: String,
created: Date
});

module.exports.FacebookUsers = mongoose.model('FacebookUsers',facebookSchema);