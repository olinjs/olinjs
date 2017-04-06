var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
	ingredients: [String],
	completed: Boolean
});

module.exports = mongoose.model("Orders", orderSchema);

