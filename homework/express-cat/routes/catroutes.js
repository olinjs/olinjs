var path = require('path');
var mongoose = require('mongoose');
var cns = require(path.join(__dirname,'../catnames.js'));
var CatMod = require(path.join(__dirname,'../modelsdb'));
var catSchema = CatMod.CatSchema;
var Cat = mongoose.model('Cat', catSchema);

var makecat = function(req, res) {
    var ncName = cns.getCatName();
    var ncAge = cns.getCatAge();
    var ncColors = cns.getCatColors();
    var newcat = new Cat({name:ncName, age:ncAge, colors:ncColors})
    newcat.save(function (err) {
      if (err) {
        console.log("Problem saving new cat", err);
      }
    });
    Cat.find(function (err, kittens) {
      if (err) return console.error(err);
      console.log(kittens)
    })
    // res.send('saved new cat')
    res.render('catstat', {
        name : ncName,
        age : ncAge,
        colors : ncColors
    });
}

var allcats = function(req, res, next) {
    // get cat name
    // get cat color(s)
    // get cat age
    // store in database
}

var getcolorcats = function(req, res, next) {
    // get cat name
    // get cat color(s)
    // get cat age
    // store in database
}

var killcat = function(req, res, next) {
    // get cat name
    // get cat color(s)
    // get cat age
    // store in database
}

module.exports.makecat = makecat;
module.exports.allcats = allcats;
module.exports.getcolorcats = getcolorcats;
module.exports.killcat = killcat;
