var mongoose = require("mongoose");

var catSchema = mongoose.Schema({
  name: String,
  colors: [String],
  age: Number
});

module.exports = mongoose.model("Cat", catSchema);
