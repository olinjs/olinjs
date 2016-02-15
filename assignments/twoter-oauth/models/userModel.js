
var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
  oauthID: Number,
  name: String,
  twotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'twote'}]
  //inStock: Boolean,
});


module.exports = mongoose.model("user", userSchema); 