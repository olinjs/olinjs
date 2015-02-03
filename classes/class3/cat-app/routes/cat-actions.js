var path = require("path");
var catData = require("./catData");
var Cat = require(path.join(__dirname,"../models/catSchema"));

var cats = {};

//add new cat
cats.new = function (req,res) {
  var name = //select random entry from /catData.names
  var age = //select random number from /catData.ages
  var colors = //select random list from /catData.colors
  var acat = new Cat({name: name, age: age, colors: colors});
  acat.save(function (err) {
    if (err) {
      console.log("Problem saving " + name + ".");
    };
  });
};

//sort cats
cats.sort = function (req,res) {
  var param = //requested parameter
  var value = //requested value
  cats.find({param : value})
    .sort({param : -1})
    .exec(function (err, cats) {
      console.log(cats);
    });
};

//delete cat
cats.delete = function (req,res) {
  var param = //requested parameter
  var value = //requested value
  cats.remove(param : value);
};

module.exports = cats;