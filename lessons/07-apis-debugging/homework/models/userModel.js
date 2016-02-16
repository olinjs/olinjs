var mongoose = require('mongoose');

// Create a Schema
var userSchema = mongoose.Schema({
  name: String,
  facebookId: String,
  twotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Twote' }]
});

module.exports = mongoose.model("User", userSchema);