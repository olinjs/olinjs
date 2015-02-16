var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  user: String,
  twotes: Array,
  time: Number
});

module.exports = mongoose.model('User', userSchema);