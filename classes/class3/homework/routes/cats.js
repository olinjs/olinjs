var path = require('path');
var Cat = require(path.join(__dirname, '../models/cat'));

var colors = ['yellow',
              'green',
              'red',
              'black',
              'blue',
              'orange',
              'tabby',
              'NaN',
              'brown',
              'teal',
              'lemmony yellow',
              'grey',
              'gray',
              'maroon',
              'macaroon'];

var names = ['George',
             'Malyssa',
             'Frederick',
             'Johan',
             'Suzy',
             'Mary',
             'Skags',
             'Robert',
             'Tinkerbell',
             'Mr. Whiskers',
             'King Fluffybutt']

var cats = {};

function all(req, res) {
  var colorFilter;
  Cat.find({colors: colorFilter}, function(err, cats) {
    res.render('cats', {cats: cats});
  });
}

function create(req, res) {
  var color = colors[Math.floor(Math.random() * colors.length)];
  var name = names[Math.floor(Math.random() * names.length)];
  var age = Math.floor(Math.random() * name.length);
  var catObject = {
    name: name,
    age: age,
    colors: color
  };
  var newCat = new Cat(catObj);
  newCat.save(function(err) {
    if (err) {
      console.log('Cat object couldn\'t be saved');
    } else {
      res.render('cats', [catObj]);
    }
  });
}

function list(req, res) {
  var colorFilter;
  if (req.params.color) {
    colorFilter = req.params.color.toLowerCase();
  } else {
    colorFilter = '';
  }
  Cat.find({colors: colorFilter}).sort({age: -1}).exec(function(err, cats) {
    if (err) {
      console.log('Couldn\'t find cat');
    } else {
      res.render('cats', {cats: cats});
    }
  });
}

function remove(req, res) {
  Cat.findOneAndRemove({}, {sort: {age: -1}}, function(err, cat) {
    if (err) {
      console.log('Unable to find/remove cat');
    } else {
      console.log('Cat removed');
      res.render('cats', {cats: cats});
    }
  })
}

module.exports.all = all;
module.exports.list = list;
module.exports.create = create;
module.exports.remove = remove;