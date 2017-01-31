var mongoose = require('mongoose');

// Create a Schema
var twoteSchema = mongoose.Schema({
  text: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

twoteSchema.pre('remove', function(next) {
    // Remove all the assignment docs that reference the removed twote.
    this.model('User').update({ twotes: this._id }, { $pull: { twotes: this._id}}, next);
});

module.exports = mongoose.model("Twote", twoteSchema);