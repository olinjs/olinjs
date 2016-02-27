var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/WikiDatabase');

//Schema
var pageSchema = mongoose.Schema({
  author: String,
  editor: String,
  text: String,
  time: Number
});

module.exports = {
	pageModel: mongoose.model("page", pageSchema)
} 