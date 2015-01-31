var path = require("path");
var catData = require("./catData");
var Cat = require(path.join(__dirname,"../models/catModel"));

var cats = {};

//new cat
cats.new = function (req,res) {
  var name = //select random entry from /catData.names
  var age = //select random number from 1-20
  var colors = //select random list from /catData.colors
  cats.insert({'name': name, 'age': age, 'colors': colors});
};

//sort cats
cats.sort = function (req,res) {
  var catsSorted = [];
  var param = //requested parameter
  var value = //requested value
  cats.find(param : value);
};

//delete cat
cats.delete = function (req,res) {
  var param = //requested parameter
  var value = //requested value
  cats.remove(param : value);
};