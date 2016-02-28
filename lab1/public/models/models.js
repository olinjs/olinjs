var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/WikiDatabase');

//Schema
var pageSchema = mongoose.Schema({
  author: String,
  title: String,
  content: String,
  timestamp: Number
});

module.exports = {
	pageModel: mongoose.model("page", pageSchema)
} 