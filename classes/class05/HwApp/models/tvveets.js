var mongoose = require("mongoose");

var tvveetsSchema = mongoose.Schema({
		text: String,
        author: String,
        author_id: String,
});

module.exports.tvveetsSchema = tvveetsSchema;
