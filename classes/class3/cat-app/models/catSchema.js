var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var catSchema = new Schema({
  name: String,
  age: Number,
  colors: [String]
});

module.exports = mongoose.model("Cat", catSchema);