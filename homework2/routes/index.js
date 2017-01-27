var express = require('express');
var router = express.Router();
var db = require('../fakeDatabase');


var catAge = ["1","2","3","4","5","6","7","8","9"];
var catName = ["Toby","Dwight","Jim","Merredith","Angela","Michael","Pam"];
var catColor = ["red","orange","yellow","green","blue","purple","black"];

//returns a random  value from list
function rand(input){
  return input[Math.floor(Math.random()*input.length)];
}

//returns an array of up to 9 different random colors
function randColors(array){
  var currentIndex = array.length, tempValue, randIndex;
  while(0 != currentIndex){
    randIndex = Math.floor(Math.random()*currentIndex);
    currentIndex -= 1;

    tempValue = array[currentIndex];
    array[currentIndex] = array[randIndex];
    array[randIndex] = tempValue;
  }
  var colors = Math.floor(Math.random()*array.length)+1
  return array.slice(0,colors)
}

// create new cat
var createCat = function (req,res){
  var myCat = {name: rand(catName), age: rand(catAge), colors: randColors(catColor)};
  db.add(myCat);
  res.render("cats",{"added": myCat});
};

//list cats
var listCats = function (req,res){
  var allCats = db.getAll();
  //orders the cats from oldest to youngest
  allCats.sort(function(a, b){
    return parseFloat(b.age) - parseFloat(a.age);
  });
  res.render("cats",{"classes": allCats});
};

//sort cats by color
var sortCats = function (req,res, next){
  //https://webapplog.com/url-parameters-and-routing-in-express-js/
  var color = req.params.color;
  var allCats = db.getAll();
  var someCats = [];
  allCats.forEach(function(cat){
    if (cat.colors.indexOf(color) > -1){
      someCats.push(cat);
    }
  });
  someCats.sort(function(a, b){
    return parseFloat(b.age) - parseFloat(a.age);
  });
  res.render("cats",{"classes": someCats})
};

//deletes oldest cat in database
var deleteCat = function (req,res){
  var allCats = db.getAll();
  allCats.sort(function(a, b){
    return parseFloat(b.age) - parseFloat(a.age);
  });
  var deletedCat = allCats[0]
  db.remove(deletedCat);
  //removes first element in allCats array
  allCats.shift();
  //reassigns database data the new allCats array
  db.data = allCats;
  res.render("cats",{"classes": allCats,"deleted": deletedCat});
}

//functions to export
module.exports.createCat = createCat;
module.exports.listCats = listCats;
module.exports.deleteCat = deleteCat;
module.exports.sortCats = sortCats;
