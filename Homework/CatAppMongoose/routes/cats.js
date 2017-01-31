var Cat = require('../models/catModel.js'); //require schema of cat model

names = ['Hildegard', 'The Ripper', 'Snowstorm', 'Three Balls', 'Tigger', 'Lassie', 'Aardvark', 'Electabuzz', 'Falco Lombardi', 'Bill Wong', 'Professor Feline', 'Jester', 'Bruce', 'King Arthur', 'Bagel with Cream Cheese', 'Dave', 'Bob', 'Cucumber']
colors = ['pink', 'red', 'crimson', 'cherry', 'scarlet', 'mahogany', 'raspberry', 'auburn', 'burgundy', 'rose']


//function that constructs and returns a cat object
function Cat(name, color, age){
  var cat = {
    name : name,
    color : color,
    age : age,
  };
  return cat;
}

//Generates a random age between 1 and 20
function RandomAge(){
  return Math.floor(Math.random() * 20) + 1; 
}

//Sorts an array of cats by their ages
function sortByAge(cats){
  cats.sort(function(a,b) {
      return a.age - b.age;  //compares ages
    });
  return cats;
}

// Delete the oldest cat
var getCatsDeleteOld = function(req, res) {
  Cat.findOneAndRemove({}, {sort: {"age":-1}}, function(err, cat) {
    if (err) return console.error(err); //in case of error
    res.render("cats", {"oldestCat": cat})
  });
};


// Get all cat names
var getCats = function(req, res) {
  Cat.find({}, function(err, cats){
    if (err) return console.error(err); //in case of error
    sortedCats = sortByAge(cats);       //sorts cats by age
    res.render('cats', {'cats': sortedCats});
  });
};


// Creates a new cat and displays its information
var getCatsNew = function(req, res) {
  var newCat = new Cat({
    name : names[Math.floor(Math.random() * names.length)], //gives cat a random name
    color : colors[Math.floor(Math.random() * colors.length)], //gives cat a random color
    age : RandomAge()
  });
  newCat.save(function(err, cat) {
    if (err) return console.error(err);
  });
  res.render("cats", {"cats": [newCat]});
};

var getCatsYoungerThan = function(req, res, next, value) {  
  Cat.find({ "age": { $lt: value }}, function(err, cats){
      if (err) return console.error(err);
      res.render("cats", {"cats": sortByAge(cats)});
  });
};

var getCatsOlderThan = function(req, res, next, value) {  
  Cat.find({ "age": { $gt: value }}, function(err, cats){
      if (err) return console.error(err);
      res.render("cats", {"cats": sortByAge(cats)});
  });
};

var getCatsByColor = function(req, res, next, value) {  
  var colorCats = [];
  Cat.find({}, function(err, cats){
    if (err) return console.error(err); //in case of error
    for (i=0; i<cats.length; i++) {
      if (cats[i].color == value) {
        colorCats.push(cats[i]);
      }
    res.render("cats", {"cats": sortByAge(colorCats)});
    }
  });
};

module.exports.getCats = getCats;
module.exports.getCatsNew = getCatsNew;
module.exports.getCatsByColor = getCatsByColor;
module.exports.getCatsDeleteOld = getCatsDeleteOld;
module.exports.getCatsYoungerThan = getCatsYoungerThan;
module.exports.getCatsOlderThan = getCatsOlderThan;