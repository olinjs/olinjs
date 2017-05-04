var mongoose = require('mongoose');

// Create a Schema
var catSchema = mongoose.Schema({
  name: String,
  color: String,
  age: Number
});

module.exports = mongoose.model("cat", catSchema);