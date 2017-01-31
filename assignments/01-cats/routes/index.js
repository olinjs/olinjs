var express = require('express');
var router = express.Router();
var db = require('../fakeDatabase');

//function that constructs and returns lizard object
function Cat(name, age, color){
  var cat = {
    name: name,
    age: age, 
    color: color,
  };
  return cat;
}

//get all lizard names
router.get('/', function(req, res, next){
  var cats = db.getAll();
  var msg = "Cat names are: ";
  cats.forEach(function(cat){
    msg = msg + cat.name + ",";
  })

  cats.sort(function(a, b) {
    return a.age - b.age;
  });

  res.render("home", {allcats: cats});
  console.log(msg);
});

// create new lizard named Bob
router.get('/new', function(req, res, next) {
  var catnames = ['Anne', 'Sam', 'Tenzin', 'Jeff', 'Emily', 'Jennifer'];
  var catname = catnames[Math.floor(Math.random()*catnames.length)];

  var catage = Math.floor((Math.random() * 10) + 1);

  var catcolors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
  var catcolor = catcolors[Math.floor(Math.random()*catcolors.length)];

  newcat = Cat(catname, catage, catcolor);
  db.add(newcat);
  res.render("new", newcat);
  console.log("Cat added!");

});

router.get('/bycolor/:color', function(req, res, next) {
  var sortcolor = req.params.color;
  var cats = db.getAll();

  var cats_color = [];
  cats.forEach(function(cat) {
    if (cat.color == sortcolor) cats_color.push(cat);
  });

  cats_color.sort(function(a, b) {
    return a.age - b.age;
  });

  res.render("bycolor", {allcats: cats_color});
  console.log(cats_color);
});

router.get('/delete/old', function(req, res, next) {
  var cats = db.getAll();

  var oldest = 0;
  var oldest_index = 0;
  var index = 0;
  cats.forEach(function(cat){
    if(cat.age >= oldest) {
      oldest = cat.age;
      oldest_index = index;
    } 
    index++;
  });

  var removed_cat = db.remove(oldest_index);

  console.log("Removed cat " + removed_cat[0].name);
  res.render('delete', removed_cat[0]);


});

module.exports = router;