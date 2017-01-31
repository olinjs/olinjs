var mongoose = require('mongoose');

// Create a Schema
var toySchema = mongoose.Schema({
  name: String
});

var Toy = mongoose.model("toy", toySchema);

module.exports = Toy;
