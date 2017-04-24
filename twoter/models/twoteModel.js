var mongoose = require('mongoose');

// Create a Schema
var twoteSchema = mongoose.Schema({
  text: String,
  user: String,
  user_id: String,
  deleted: Boolean,
  date: {type: Date},
});

module.exports = mongoose.model("twoteModel", twoteSchema);
