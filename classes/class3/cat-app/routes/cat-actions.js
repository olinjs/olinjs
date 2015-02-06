var path = require("path");
// var catData = require("./catData");
var Cat = require(path.join(__dirname,"../models/catSchema"));

var cats = {};

//add new cat
cats.new = function (req,res) {
  var name = Fluffy;//select random entry from /catData.names
  var age = 12;//select random number from /catData.ages
  var colors = ['white','black'];//select random list from /catData.colors
  var acat = new Cat({name: name, age: age, colors: colors});
  acat.save(function (err) {
    if (err) {
      console.log("Problem saving " + name + ".");
    };
  });
};

cats.list = function (req, res) {
  cats.sort({age: -1})
  .exec(function (err, cats) {
      if (err) {
        console.log("Problem saving " + name + ".");
        else {res.render("home", cats)};
    };
  });
};

//sort cats
cats.sort = function (req,res) {
  var param = color;//requested parameter
  var value = req.params.color;//requested value
  cats.find({param : value})
    .sort({age : -1})
    .exec(function (err, cats) {
      if (err) {
        console.log("Problem saving " + name + ".");
        else {res.render("home", cats)};
      };
    });
};

// //delete cat
// cats.delete = function (req,res) {
//   var param = //requested parameter
//   var value = //requested value
//   cats.remove(param : value);
// };

module.exports.cats = cats;