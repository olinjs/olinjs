var mongoose = require('mongoose');

// Create a Schema
var catSchema = mongoose.Schema({
  name: String,
  age: Number,
  colors: [String]
});

module.exports = mongoose.model("cat", catSchema);