var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Successfully opened mongo database.');
});

var catSchema = mongoose.Schema({
  name: String,
  age: Number,
  colors: [String]
});
var Cat = mongoose.model('Cat', catSchema);

var firstNames = ['Hagar', 'Catface', 'Hardcastle',
                  'Harmony', 'Ronnie', 'Harry',
                  'Professor', 'Upfish', 'Valmart',
                  'Dazzler', 'Roast-Beefy', 'Joey'];
var lastNames  = ['the Horrible', 'Meowmers', 'McCormick',
                  'the Wretch', 'the Bear', 'Freaking Potter',
                  'Snake', 'Hufferpuffer', 'Viacom',
                  'the Half-Dead', 'O\'Weefy', 'Lumbermouth'];
var colors = ['red', 'yellow', 'blue', 'invisible', 'tangerine',
              'poopy brown', 'lime', 'chartreuse', 'olive',
              'seafoam', 'aquamarine', 'azure', 'puce', 'puke'];

function choose (choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function pickColors() {
  var res = [];
  colors.forEach(function(col) {
    if (Math.random() > 0.8) {
      res.push(col);
    }
  });
  if (res.length == 0) {
    res.push(choose(colors));
  }
  return res;
}

var addCat = function() {
  var catName = choose(firstNames) + ' ' + choose(lastNames);
  var catColors = pickColors();
  var catAge = Math.floor(Math.random() * 18) + 1;

  var cat = new Cat({name: catName, age: catAge, colors: catColors});

  cat.save(function (err) {
    if (err) {
      console.log("Problem saving cat", err);
    }
  });

  return catToString(cat);
}

function catToString(cat) {
  return cat.name + 
         ' the ' +
         cat.age.toString() +
         '-year-old, '
         + cat.colors.join(' and ') +
         ' colored cat';
}

function catsByColor(res, color) {
  console.log("HELLO" + color);
  Cat.find( { colors: color } )
    .exec(function (err, cats) {
      // Once the cats have been found,
      // render them.
      cats = cats.map(catToString);
      res.render('byColor', {'color': color, 'cats': cats});
    });
}

function allCats(res) {
  Cat.find()
    .sort({age: 'asc'})
    .exec(function (err, cats) {
      cats = cats.map(catToString);
      res.render('byColor', {'cats': cats})
    });
}

function deleteOldest(res) {
  Cat.find()
    .sort({age: 'desc'})
    .exec(function (err, cats) {
      if (cats.length === 0) {
        res.render('deleteOldest', {cat: 'nobody at all'});
        return;
      }

      cat = cats[0];
      console.log(cat)
      var catStr = catToString(cat);
      //Cat.remove({_id: cat._id});
      cat.remove()
      res.render('deleteOldest', {cat: catStr}); 
    });
}

var pickColor = function(res) {
  res.render('chooseColor', {colors: colors})
}

module.exports.addCat = addCat;
module.exports.catsByColor = catsByColor;
module.exports.allCats = allCats;
module.exports.deleteOldest = deleteOldest;
module.exports.pickColor = pickColor