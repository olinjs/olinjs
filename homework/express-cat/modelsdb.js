var mongoose = require('mongoose');


var catSchema = mongoose.Schema({
    name: String,
    age: Number,
    colors: [String]
})
var modd = mongoose.model('Cat', catSchema); // why do I need this line?

module.exports.catSchema = catSchema
