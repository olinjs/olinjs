var db = require('../fakeDatabase');

names = ['Hildegard', 'The Ripper', 'Snowstorm', 'Three Balls', 'Tigger', 'Lassie', 'Aardvark', 'Electabuzz', 'Falco Lombardi', 'Bill Wong', 'Professor Feline', 'Jester', 'Bruce', 'King Arthur']
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
    return a.age - b.age;
  });
  return cats;
}

// Delete the oldest cat
var getCatsDeleteOld = function(req, res) {
  oldest_index = 0;
  cats = db.getAll();
  if (cats.length == 1) {
      db.remove(0);
  } else if (cats.length>1) {
      for (i=1; i<cats.length; i++) {
        if (cats[i].age > cats[oldest_index].age) {
          oldest_index = i;
        }
      }
      db.remove(oldest_index);
    }
  res.render("cats", {"oldestCat" : [cats[oldest_index]]});
};


// Get all cat names
var getCats = function(req, res) {
  var cats = db.getAll();
  sortedCats = sortByAge(cats);
  res.render("cats", {"cats" : sortedCats});
};


// Creates a new cat and displays its information
var getCatsNew = function(req, res) {
  var randName = names[Math.floor(Math.random() * names.length)];  
  var randColor = colors[Math.floor(Math.random() * colors.length)];
  var randAge = RandomAge();
  var addCat = Cat(randName, randColor, randAge);
  db.add(addCat);
  var cats = db.getAll();
  console.log(cats);
  res.render("cats", {"cats": [addCat]});
};



var getCatsByColor = function(req, res, next, value) {  
  var colorCats = [];
  var cats = db.getAll();
  for (i=0; i<cats.length; i++) {
    if (cats[i].color == value) {
      colorCats.push(cats[i]);
    }
  }
  console.log(colorCats);
  res.render("cats", {"cats": colorCats});
};

module.exports.getCats = getCats;
module.exports.getCatsNew = getCatsNew;
module.exports.getCatsByColor = getCatsByColor;
module.exports.getCatsDeleteOld = getCatsDeleteOld;