var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: String,
  twotes: Array,
  time: Number
});

module.exports = mongoose.model('User', userSchema);