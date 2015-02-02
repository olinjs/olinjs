var mongoose = require("mongoose");

var burgersSchema = mongoose.Schema({
		ingredients: Array,
});

module.exports.burgersSchema = burgersSchema;
