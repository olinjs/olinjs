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
    Cat.find(function (err, allcats) {
      if (err) return console.error(err);
      console.log(allcats)
    })
    res.render('catstat', {
        name : ncName,
        age : ncAge,
        colors : ncColors
    });
}

var allcats = function(req, res, next) {
    Cat.find({}, 'name age colors', function (err, allcats) {
      if (err) return console.error(err);
      res.send(allcats)
    })
}

var getcolorcats = function(req, res) {
    Cat.find({colors: req.params.color}, 'name age colors', function (err, colorcats) {
      if (err) return console.error(err);
      res.send(colorcats)
    })
}

var killcat = function(req, res) {
    Cat.findOneAndRemove({}, {sort: {age: -1}}, function(err, oldcat) {
        if (err) return console.error(err);
        console.log(oldcat);
        res.send('Old cat ees ded.');
      })
}

module.exports.makecat = makecat;
module.exports.allcats = allcats;
module.exports.getcolorcats = getcolorcats;
module.exports.killcat = killcat;
