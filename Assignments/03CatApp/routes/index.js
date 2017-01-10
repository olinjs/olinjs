var router = {};

var express = require('express');

var db = require('../fakeDatabase');

var nameList = ["Tom", "James", "Shruti", "Sherry"];


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function getColor() {
  colorList = ['black', 'white', 'yellow', 'gray', 'brown'];
  firstColor = colorList[getRandomInt(0, colorList.length-1)];
  secondColor = colorList[getRandomInt(0, colorList.length-1)];
  return [firstColor, secondColor];
}
//function that constructs and returns lizard object
function getCat(){
  var cat = {
    name: nameList[getRandomInt(0,nameList.length-1)],
    age: getRandomInt(0,100),
    color: getColor()
  };
  return cat;
}

function sortCats(cats){
	cats.sort(function (a, b) {
		if (a.age > b.age) {
			return 1;
		}
		if (a.value < b.value) { // what is the value of a cat??
			return -1;
		}
		// a must be equal to b
		return 0;
	});
	return cats;
}

function findOldestCat(cats){
	var maxAge = 0;
	var index = 0;
	var counter = 0;
	cats.forEach(function(cat){
		if (maxAge < cat.age){
			maxAge = cat.age;
			index = counter;
			counter += 1;
		}
	});
	return index;
}

function sortCatsbyColor(paramColor, cats){
	var colorCats = [];
	for (var i = 0; i < cats.length; i++){
		console.log("color[0]" + cats[i].color[0]);
		console.log("color[1]" + cats[i].color[0]);
		if ((cats[i].color[0] == paramColor)||(cats[i].color[1] == paramColor)){
			colorCats.push(cats[i]);
		}
	}
	console.log(colorCats)
	return colorCats;
}


//get all cat names
router.getAllCats = function(req, res, next){
	var cats = db.getAll();
	cats = sortCats(cats);
	console.log(cats)
	var message = "All the cats are: "
	res.render("allCats", {message: message, cats: cats});
};
/* When you declare functions as methods on objects (like this) or with "var", convention is
 * to end with a semicolon. When you use function (like your sortCatsByColor), you don't need
 * a semicolon.
 */


// create new cat -- make sure you keep your documentation up to date with your code
router.getNewCat = function(req, res, next) {
	var cat = getCat();
	db.add(cat);
	var message = "new cat: "
	cats = [cat];
	res.render("allCats", {message: message, cats: cats});
	// and make sure you clear out your comments, console.logs
};

router.getCatColor = function(req, res){
	var color = req.params.color;
	color = color.slice(1, color.length); // only need "var" the first time the variable is defined
	/* We had a conversation about this -- I think you were visiting cats/byColor/:orange
	 * instead of cats/byColor/orange, so you're needing to slice off the colon.
	 * If you just visit cats/byColor/orange, you won't need the line above
	 */
	var cats = db.getAll();
	cats = sortCatsbyColor(color, cats);
	res.render("allCats", {message: "Find cats: ", cats: cats});
	// you could put the message inline, too, like this ^ -- avoids an unnecessary
	// variable assignment.
};

router.deleteCat = function(req, res){
	var cats = db.getAll();
	var index = findOldestCat(cats);
	var cat = db.remove(index);
	res.render("allCats", {message: "delete cat: ", cats: cat})
};

router.home = function(req, res){
	res.render("home");
};


module.exports = router;
