var express = require('express');
var router = express.Router();
var Cat = require('../models/catModel.js');
var Toy = require('../models/toyModel.js')

var catAge = ["1","2","3","4","5","6","7","8","9"];
var catName = ["Toby","Dwight","Jim","Merredith","Angela","Michael","Pam"];
var catColor = ["red","orange","yellow","green","blue","purple","black"];
var catToys = ["string","straw","ball","stick","leaf","bug","mouse"];

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
//add toy to random cat
var createToy = function (req,res){
  Cat.find({}, function(err,allCats){
    var myToy = new Toy({name:rand(catToys)});
    allCats.toys.push(myToy);
    allCats.save();
    console.log(allCats)
    res.render("cats",{"classes": allCats})
  });
}
// create new cat
var createCat = function (req,res){
  var myCat = new Cat ({name: rand(catName), age: rand(catAge), colors: randColors(catColor)});
  myCat.save(function (err, myCat){
    if (err) return console.error(err);
  });
  res.render("home",{"added": myCat});
};

//list cats
var listCats = function (req,res){
  //orders the cats from oldest to youngest
  Cat.find({}, function(err, allCats){
    allCats.sort(function(a, b){
      return parseFloat(b.age) - parseFloat(a.age);
    });
    res.render("cats",{"classes": allCats});
  });
};

//sort cats by color
var sortCats = function (req,res, next){
  //https://webapplog.com/url-parameters-and-routing-in-express-js/
  var color = req.params.color;
  var someCats = [];

  Cat.find({}, function(err, allCats){
    allCats.forEach(function(cat){
      if (cat.colors.indexOf(color) > -1){
        someCats.push(cat);
      }
    });
    someCats.sort(function(a,b){
      return parseFloat(b.age) - parseFloat(a.age);
    });
    res.render("cats",{"classes": someCats});
  });
};

//deletes oldest cat in database
var deleteCat = function (req,res){
  Cat.find({}, function(err, allCats){
    allCats.sort(function(a, b){
      return parseFloat(b.age) - parseFloat(a.age);
    });
    var deletedCat = allCats[0]
    var name = deletedCat.name;
    var age = deletedCat.age;
    var colors = deletedCat.colors;
    Cat.find({name:deletedCat.name,age:deletedCat.age,colors:deletedCat.colors}).remove(function(err,res){
      if (err){
        throw err;
      }
    });
    //removes first element in allCats array
    allCats.shift();
    res.render("cats",{"classes": allCats,"deleted": deletedCat});
  });
}

var gteCat = function (req,res){
  Cat.find({age: {$gte: 7}}, function(err, allCats){
    res.render("cats",{"classes": allCats})
  })
}
//functions to export
module.exports.createCat = createCat;
module.exports.listCats = listCats;
module.exports.deleteCat = deleteCat;
module.exports.sortCats = sortCats;
module.exports.gteCat = gteCat;
module.exports.createToy = createToy;
