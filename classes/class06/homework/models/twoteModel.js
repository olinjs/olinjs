var mongoose = require('mongoose');

var twoteSchema = mongoose.Schema({
  creator: String,
  content: String,
  time: Date
});

module.exports = mongoose.model('Twote', twoteSchema);