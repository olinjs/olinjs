var mongoose = require('mongoose');

var catSchema = mongoose.Schema({
    name: String,
    age: Number,
    color: String
  });

module.exports = mongoose.model('Cat', catSchema);