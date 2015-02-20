var path = require("path");
var catData = require("./catData");
var Cat = require(path.join(__dirname,"../models/catModel"));


var colors = catData.colors;
var numColors = colors.length;
var names = catData.names;
var numNames = names.length;

var cats = {};

cats.new = function(req, res) {
  var catColors = [];
  for (var i = Math.floor(Math.random()*3)+1; i > 0; i--) {
    catColors.push(colors[Math.floor(Math.random()*numColors)].toLowerCase());
  }
  catColors = catColors.filter(function(val, ind, arr) { return arr.indexOf(val) === ind;})
  var name = names[Math.floor(Math.random()*numNames)];
  var age = Math.floor(Math.random()*numNames);
  var catObj = {
    name: name,
    age: age,
    colors: catColors
  };
  var newCat = new Cat(catObj);
  newCat.save(function(err) {
    if (err) {
      res.status(500).send('Something broke!');
    } else {
      res.render("cats", {
        message: "New cat created:",
        cats: [catObj] 
      });
    }
  });
};

cats.list = function(req, res){
  // res.sendFile(path.resolve(__dirname + "/../public/index.html"));

  var colorFilter;
  var message;
  if (req.params.color) {
    colorFilter = req.params.color.toLowerCase();
    message = "Cats by age with color " + req.params.color+ ":";
  } else {
    colorFilter = /^.*/;
    message = "Cats by age:";
  }
  Cat.find({colors: colorFilter})
    .sort({age: -1})
    .exec(function(err, cats) {
    if (err) {
      res.status(500).send("Something broke!");
    } else {
      res.render("cats", {
        message: message,
        cats: cats
      });
    }
  })
}

// cats.listJson = function(req, res) {
//   var colorFilter;
//   var message;
//   if (req.params.color) {
//     colorFilter = req.params.color.toLowerCase();
//     message = "Cats by age with color " + req.params.color+ ":";
//   } else {
//     colorFilter = /^.*/;
//     message = "Cats by age:";
//   }
//   Cat.find({colors: colorFilter})
//     .sort({age: -1})
//     .exec(function(err, cats) {
//     if (err) {
//       res.status(500).send("Something broke!");
//     } else {
//       res.json({
//         message: message,
//         cats: cats
//       })
//     }
//   })
// };

cats.delete = function(req, res) {
  Cat.findOneAndRemove({}, {sort: {age: -1}}, function(err, cat) {
    if (err) {
      res.status(500).send("Something broke!");
    } else {
      var cats = [cat];
      var message = "A cat disappeared into the night:";
      if (!cat) {
        cats = null;
        message = "No cats left!";
      }
      var cats = cat ? [cat] : null;
      res.render("cats", {
        message: message,
        cats: cats
      });
    }
  })
};

module.exports = cats;
