var express = require('express');
var db = require('../fakeDatabase');
var router = express.Router();

//function that constructs and returns lizard object
function Cat(name,age,colors){
  var cat = {
    name: name,
    age: age,
    colors: colors
  };
  return cat;
}

//http://stackoverflow.com/questions/11935175/sampling-a-random-subset-from-an-array
function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

var newCat = function(req, res){
	var nameList = ["Sam","Mac-I","Sophia","Felix","Allison"];
	var colorList = ["Black", "Orange", "Brown", "White","Gray", "Silver", "Cream"];
	var name = nameList[Math.floor(Math.random()*nameList.length)];
	var age = Math.floor((Math.random() * 20) + 1);
	var colors = getRandomSubarray(colorList,Math.floor(Math.random()*4)+1)
	var cat = Cat(name, age, colors)
	db.add(cat );
	res.render("cat", {"action":"Added Cat!","cat": cat});
};

var listCats = function(req, res){
	var cats = db.getAll();
	cats.sort(function(a,b) {return a.age - b.age;})
	res.render("cats", {"cats": cats});
};

function getOldest(cats) {
	var max = cats[0].age;
	var maxIndex = 0;

	for (var i = 0; i < cats.length; i++) {
		console.log(cats[i].age)
	    if (cats[i].age > max) {
	        maxIndex = i;
	        max = cats[i].age;
	        console.log("max");
	    }
	}
	return maxIndex;
}

var byColor = function(req, res) {
	var cats = db.getAll();
	var filteredCats = cats.filter(function(cat) {
		return (-1 != cat.colors.indexOf(req.params.color));
	})
	filteredCats.sort(function(a,b) {return a.age - b.age;})
	res.render("cats", {"cats": filteredCats});
}

var deleteOld = function(req, res) {
	var cats = db.getAll();
	if (!cats.length) {
		res.render("cat", {"action": "No Cats to Remove!"});
		return
	}
	var oldCatInd = getOldest(cats)
	db.remove(oldCatInd);
	res.render("cat", {"action": "Deleted Oldest Cat!","cat": cats[oldCatInd]});
}

module.exports.newCat = newCat;
module.exports.listCats= listCats;
module.exports.byColor= byColor;
module.exports.deleteOld= deleteOld;