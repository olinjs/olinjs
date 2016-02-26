var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TwoterDatabase');

//Schema
var pageSchema = mongoose.Schema({
  author: String,
  editor: String,
  text: String,
  time: Number
});

var userSchema = mongoose.Schema({
  name: String
});

module.exports = {
	twoteModel: mongoose.model("twote", twoteSchema),
	userModel: mongoose.model("user", userSchema)
} 