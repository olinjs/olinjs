
var mongoose = require('mongoose');


var twoteSchema = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  username: String,
  datetime: Date, 
  text: String,
  //inStock: Boolean,
});


module.exports = mongoose.model("twote", twoteSchema); 