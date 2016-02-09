
var mongoose = require('mongoose');


var twoteSchema = mongoose.Schema({
  user: String,
  datetime: Date, 
  text: String,
  //inStock: Boolean,
});


module.exports = mongoose.model("twote", twoteSchema); 