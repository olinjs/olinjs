var mongoose = require('mongoose');   

// define model =================
var todoSchema = mongoose.Schema({
  text : String,
  isCompleted: {type: Boolean, default: false},
});

module.exports = mongoose.model('todo', todoSchema); 