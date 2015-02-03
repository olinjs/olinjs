var mongoose = require('mongoose');

var schema =  mongoose.Schema({
	customerName: String,
	items: [mongoose.Schema.ObjectId]
});

module.exports = mongoose.model('Order', schema);