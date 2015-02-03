var mongoose = require('mongoose');

var cat_schema = mongoose.Schema({
    age: Number,
    name: String,
    colors: [String]
})

module.exports = mongoose.model('Cat', cat_schema);

