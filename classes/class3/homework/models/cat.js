var mongoose = require("mongoose");
var names = require("./names");
var colors = require("./colors");

var MAX_AGE = 100;

exports.Cat = mongoose.model('Cat', mongoose.Schema({
    name: String,
    colors: [ String ],
    age: Number,
}));

/*
 * Helpers
 */
var randInt = function (a, b) {
    return Math.floor(Math.random() * Math.abs(b - a)) + (a > b ? b : a);
};

var chooseFrom = function (from_) {
    return from_[randInt(0, from_.length)];
}

var getRandoColorList = function () {
    var colorList = [];
    for (var i = 0; i < randInt(1, 10); i++) {
        colorList.push(chooseFrom(colors.list_colors));
    }

    return removeDuplicates(colorList);
};

function removeDuplicates (arr) {
    var deduper = {}
    arr.forEach(function (item) {
        deduper[item] = null;
    });
    return Object.keys(deduper);
}

/*
 * Exported Functionality
 */
exports.newRandoCat = function () {
    return new exports.Cat({
          name: chooseFrom(names.list_names)
        , colors: getRandoColorList()
        , age: Math.floor(Math.random() * MAX_AGE)
    });
};


