var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TwoteSchema = new Schema({
	twote: String,
	authorName: String,
	authorId: String,
});

module.exports = mongoose.model('twote', TwoteSchema);