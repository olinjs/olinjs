var mongoose = require("mongoose");

var usersSchema = mongoose.Schema({
		name: String,
});

module.exports.usersSchema = usersSchema;
