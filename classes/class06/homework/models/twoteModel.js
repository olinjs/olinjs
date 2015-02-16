var mongoose = require('mongoose');

var twoteSchema = mongoose.Schema({
  user: String,
  content: String,
  time: Number
});

module.exports = mongoose.model('Twote', twoteSchema);