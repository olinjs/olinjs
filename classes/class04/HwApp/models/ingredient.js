var mongoose = require("mongoose");

var ingredientsSchema = mongoose.Schema({
		name: String,
		price: Number,
		available: Boolean,
});

module.exports.ingredientsSchema = ingredientsSchema;
