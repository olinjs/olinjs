//This type of file is usually found in app/models/robotModel.js
var mongoose = require('mongoose');

// Create a Schema
var pageSchema = mongoose.Schema({
	topic: String,
	content: String,
	author: String,
	timestamp: String,
	id: String
});

module.exports = mongoose.model("page", pageSchema);

