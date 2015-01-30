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

var allcats = function(req, res) {
    Cat.find({}, 'name age colors', function (err, allcats) {
      if (err) return console.error(err);
      res.render('cats', {'catslist': allcats, 'title': 'All of your cats'})
    })
}

var getcolorcats = function(req, res) {
    Cat.find({colors: req.params.color}, 'name age colors', function (err, colorcats) {
      if (err) return console.error(err);
      console.log(req.params.color)
      if (colorcats.length === 0) {res.render('cats', {'catslist':colorcats, 'title':'No '+req.params.color+ ' cats.'})} else{res.render('cats', {'catslist':colorcats, 'title':req.params.color+ ' cats.'})};
    })
}

var killcat = function(req, res) {
    Cat.findOneAndRemove({}, {sort: {age: -1}, select:'name age colors'}, function(err, oldcat) {
        if (err) return console.error(err);
        console.log(oldcat);
        if (!oldcat) {res.render('deadcat', {'catlist':{'name': 'Everybody', 'age': 'dead', 'colors': 'dead'}, 'title':'All of your cats have already died.'})} else{res.render('deadcat', {'catlist':oldcat, 'title':'This cat died.'})};
      })
}

var catmageddon = function(req, res) {
    Cat.find({})
      .sort({age: '-1'})
      .remove()
      .exec(function(err, cats) {
        if (err) return console.error(err);
        console.log(cats);
        res.render('cats', {'catslist':{}, 'title':'All of your cats have spontaneously died. That\'s sad.'})
      });
}

module.exports.makecat = makecat;
module.exports.allcats = allcats;
module.exports.getcolorcats = getcolorcats;
module.exports.killcat = killcat;
module.exports.catmageddon = catmageddon;
