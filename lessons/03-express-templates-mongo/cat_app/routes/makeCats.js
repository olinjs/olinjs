var express = require('express');
var router = express.Router();
var db = require('../fakeDatabase');
var catData = require('./catData.js');

var catNames = catData.catNames;
var catColors = catData.catColors;

//function that constructs and returns lizard object
function Cat(name, age, color){
  var cat = {
    name: name,
    age: age,
    color: color
  };
  return cat;
}

var cats = {};

// create new cat named Bob
cats.newCat = function(req, res) {
	var catAge = Math.floor((Math.random() * 40) + 1);
	var catName = catNames[Math.floor((Math.random() * (catNames.length -1)))];
	var catColor = catColors[Math.floor((Math.random() * (catColors.length -1)))];
	db.add(Cat(catName, catAge, catColor));
	res.render('cats', {message: ["You've added "+ catName + ', a ' 
		+ catAge + ' year old, ' + catColor + ' cat!']});
};

cats.catList = function(req, res) {
	var listFull = db.getAll();
	var listFinal = [];
	for(var i = 0; i < listFull.length; i++){
		listFinal.push(listFull[i].name);
	}
	res.render('cats', {message: 'Here are your cats:', listCats: listFinal});
};

// cats.deleteCat = function(req, res) {
// 	var listFull = db.getAll().;
// 	var deadcat = listFull[]
// 	db.remove(deadcat);
// 	var properties = [deadcat.name, deadcat.age, deadcat.color];
// 	res.render('cats', {message: 'You have killed:', listCats: properties});
// };

// //delete oldest cat
// router.get('/cats/delete/old', function(req, res, next){
//   var cats = db.getAll();
//   var msg = "Cat names are: ";
//   cats.forEach(function(liz){
//     msg = msg + liz.name + ",";
//   })
//   res.render(msg);
// });
module.exports = cats;