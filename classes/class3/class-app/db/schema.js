var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: String,
  grade: String,
  class: Number
});

module.exports.User = mongoose.model('User', userSchema);