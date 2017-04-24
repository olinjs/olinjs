// getting-started.js
var mongoose = require('mongoose');
var Toy = require('../models/toyModel.js');
mongoose.connect('mongodb://localhost/cats');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("we're connected!")
});

// Create a Schema
var catSchema = mongoose.Schema({
  name: String,
  age: String,
  colors: [String],
  toys: [Toy.schema]
});

var Cat = mongoose.model("cat", catSchema);

module.exports = Cat;
