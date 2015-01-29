var path = require('path');
var mongoose = require('mongoose');
var cns = require(path.join(__dirname,'../catnames.js'));
var CatMod = require(path.join(__dirname,'../modelsdb'));
var catSchema = CatMod.CatSchema;
var Cat = mongoose.model('Cat', catSchema);

var makecat = function(req, res, next) {
    var newcat = new Cat({name:cns.getCatName(), age:cns.getCatAge(), colors:cns.getCatColors()})
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
    next()
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
