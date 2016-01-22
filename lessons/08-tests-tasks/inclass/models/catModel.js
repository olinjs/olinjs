var mongoose = require('mongoose');

var catSchema = new mongoose.Schema({
  name: String,
  colors: [String],
  age: Number
});

module.exports = mongoose.model('Cat', catSchema);
