var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/CatDatabase');

//Schema
var catSchema = mongoose.Schema({
  name: String,
  colors: [String],
  age: Number
});

module.exports = mongoose.model("cat", catSchema);