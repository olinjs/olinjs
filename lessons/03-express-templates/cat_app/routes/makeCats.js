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

// create new cat
cats.newCat = function(req, res) {
	var catAge = Math.floor((Math.random() * 40) + 1);
	var catName = catNames[Math.floor((Math.random() * (catNames.length)))];
	var catColor = catColors[Math.floor((Math.random() * (catColors.length)))];
	db.add(Cat(catName, catAge, catColor));
	res.render('cats', {message: ["You've added "+ catName + ', a '
		+ catAge + ' year old, ' + catColor + ' cat!']});
};

//list all the cats
cats.catList = function(req, res) {
	var listFull = db.getAll();
	var listFinal = [];
	listFull.sort(function(a, b) {
    	return parseFloat(a.age) - parseFloat(b.age);
	});

	for(var i = 0; i < listFull.length; i++){
		listFinal.push([listFull[i].name, ' ' + listFull[i].age, ' ' + listFull[i].color]);
	}
	res.render('cats', {message: 'Here are your cats:', listCats: listFinal});
};


//sort cats by color

//Again this could be a general function, which you know but here is what it would look like
cats.sortColor = function(req, res) {
	var color = req.params.color;
	var listFull = db.getAll();
	var listColors = [];
	var listColorsStrings = [];

	//I think this for loop syntax for looping over arrays is cleaner,
	// but to each their own
	listFull.forEach(function(cat){
		if(cat.color === color){
			listColors.push(cat);
		}
	})

	//nice to cite sources
	//http://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
	listColors.sort(function(a, b) {
		return parseFloat(a.age) - parseFloat(b.age);
	});

	//Again I'd use forEach syntax also,
	//I might just send the cat objects and grab the attributes in handlebars
	listColor.forEach(function(cat){
		listColorsStrings.push([cat.name, ' ' + cat.age , ' ' + cat.color]);
	})

	res.render('cats', {message: 'Cats Sorted by Color & Age:', listCats: listColorsStrings});

}

cats.sortColorPink = function(req, res) {
	var color = 'Pink';
	var listFull = db.getAll();
	var listColors = [];
	var listColorsStrings = [];

	for(var i = 0; i < listFull.length; i++){
		if(listFull[i].color === color){
			listColors.push(listFull[i]);
		}
	}

	//http://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
	listColors.sort(function(a, b) {
    	return parseFloat(a.age) - parseFloat(b.age);
	});

	for(var i = 0; i < listColors.length; i++){
		listColorsStrings.push([listColors[i].name, ' ' + listColors[i].age , ' ' +listColors[i].color]);
 	 }
	res.render('cats', {message: 'Cats Sorted by Color & Age:', listCats: listColorsStrings});

	}

cats.sortColorOrange = function(req, res) {
	var color = 'Orange';
	var listFull = db.getAll();
	var listColors = [];
	var listColorsStrings = [];

	for(var i = 0; i < listFull.length; i++){
		if(listFull[i].color === color){
			listColors.push(listFull[i]);
		}
	}

	//http://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
	listColors.sort(function(a, b) {
    	return parseFloat(a.age) - parseFloat(b.age);
	});

	for(var i = 0; i < listColors.length; i++){
		listColorsStrings.push([listColors[i].name, ' ' + listColors[i].age , ' ' +listColors[i].color]);
 	 }
	res.render('cats', {message: 'Cats Sorted by Color & Age:', listCats: listColorsStrings});

	}

cats.sortColorStripedGray = function(req, res) {
	var color = 'Striped Black and Gray';
	var listFull = db.getAll();
	var listColors = [];
	var listColorsStrings = [];

	for(var i = 0; i < listFull.length; i++){
		if(listFull[i].color === color){
			listColors.push(listFull[i]);
		}
	}

	//http://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
	listColors.sort(function(a, b) {
    	return parseFloat(a.age) - parseFloat(b.age);
	});

	for(var i = 0; i < listColors.length; i++){
		listColorsStrings.push([listColors[i].name, ' ' + listColors[i].age , ' ' +listColors[i].color]);
 	 }
	res.render('cats', {message: 'Cats Sorted by Color & Age:', listCats: listColorsStrings});

	}




//delete the oldest cat
cats.deleteCat = function(req, res) {
	//http://stackoverflow.com/questions/11743392/check-if-array-is-empty-or-exists
	//you call db.getAll() twice, with a big database that would be costly, I'd call it once and save it to a variable
	if (db.getAll().length == 0){
		res.render('cats', {message: 'You have no cats to give away.'});
	} else {
	var allCats = db.getAll();
	var oldCats = [];
	var deadcat = 0;  //index of allCats that is the oldest (if only one cat, that is oldest)
	//you know my opinion on forEach :P
	for(var cat = 0; cat < allCats.length; cat++){
		//http://stackoverflow.com/questions/2672380/how-do-i-check-if-a-javascript-array-value-is-empty-or-null
		if (cat == 0){
			oldCats.push(allCats[cat]);
		} else if(allCats[cat].age > oldCats[oldCats.length-1].age){
			oldCats.push(allCats[cat]);
			deadcat = cat;  //sets dead cat to index of cat in allcats
							//resets everytime an older cat is added
		}
	}

	var deadCatObj = allCats[deadcat];

	var properties = [deadCatObj.name, deadCatObj.age, deadCatObj.color];
	db.remove(deadcat);
	res.render('cats', {message: 'You have given away:', listCats: properties});
	};
};

module.exports = cats;
