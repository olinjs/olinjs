var mongoose = require('mongoose');

var robotSchema = mongoose.Schema({
    name: String,
    abilities: [String],
    isEvil: Boolean
});

module.exports = mongoose.model("robots", robotSchema);


