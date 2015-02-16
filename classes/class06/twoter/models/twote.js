var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TwoteSchema = new Schema({
	twote: String,
	author_id: String,
});

module.exports = mongoose.model('twote', TwoteSchema);