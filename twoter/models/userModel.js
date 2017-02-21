var mongoose = require('mongoose');

// Create a Schema
var userSchema = mongoose.Schema({
  username: String,
  id: String,
  twotes: [String],
});

module.exports = mongoose.model("userModel", userSchema);
