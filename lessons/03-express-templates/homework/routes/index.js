/*
This file is for creating routes for the cat app. 
*/ 
var express = require('express'); // to make handling routes much easier
var router = express.Router(); // base of routing functions
var db = require('../fakeDatabase');
var bodyParser = require('body-parser');

// function that constructs and returns a cat object
function Cat(name, age, colors) {
	var cat = {
		name: name,
		age: age,
		colors: colors
	};
	return cat
}

// function generates random integer between min and max
function randInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

// function chooses random name from list
function chooseName() {
	var nameList = ['Bella', 'Max', 'Oliver', 'Chloe', 
	'Lucy', 'Lily', 'Charlie', 'Sophie', 'Tiger', 'Shadow', 
	'Puddin\' Head', 'Coco Nutty'
	]; // taken from a google search of most popluar cat names and names of former cats

	index = randInt(0, nameList.length);
	return nameList[index];
}

// function generates random age
function randAge() {
	return randInt(0, 25);
}

function randIndex(arr) {
	return randInt(0, arr.length);
}

// function chooses random color from list
function chooseColors() {
	colors = [];
	var colorList = ['brown', 'black', 'white', 'orange', 'gray'];
	nColors = randInt(1, 4);
	for (var i = 0; i < nColors; i++) {
		colors.push(colorList.splice(randIndex(colorList), 1)[0])
	}
	return colors;
}

// function sorts cats by age in ascending order
function catsByAge(catList) {
	return catList.sort(function(a,b) {
		var x = a.age; y = b.age;
		return ((x < y) ? -1 : ((x > y) ? 1 : 0))
	});
}

// function returns sorted list (by age) of cats of specified color
function catsByColor(color, catList) {
	var byColor = [];

	for (var i = 0; i < catList.length; i++) {
		for (var j = 0; j < catList[i].colors.length; j++)
		if (catList[i].colors[j] == color) {
			byColor.push(catList[i]);
		}
	}

	return catsByAge(byColor);
}

// function returns the index of the oldest cat in the database
function indexOfOldest(catList) {
	if (catList.length = 0) {
		return -1
	}
	else {
		var oldest = -1;
		var index = -1
		for (var i = 0; i < catList.length; i++) {
			if (catList[i].age > oldest) {
				oldest = catList[i].age;
				index = i;
			}
		return index;
		}
	}
}

// object of the functions that handle routes
var routes = {

	// home page welcome message
	home: function(req, res, next) {
		res.send("Meow");
	},

	// adds a cat with random qualities
	new: function(req, res, next) {
		var name = chooseName();
		var age = randAge();
		var colors = chooseColors();
		db.add(Cat(name, age, colors));
		res.send("Added " + name + " who is " + age + 
			" years old " + " and has " + colors + " fur.");
	},

	// lists all cats in database by age
	cats: function(req, res, next) {
		var catList = db.getAll();
		var sorted = catsByAge(catList);
		res.send(JSON.stringify(sorted));
	},

	// lists all cats in database of a specified color by age
	color: function(req, res, next) {
		var color = req.params.color;
		var catList = db.getAll();
		byColor = catsByColor(color, catList);
		res.send(JSON.stringify(byColor));
	},

	// sends the oldest cat in the database to a very nice farm
	old: function(req, res, next) {
		var catList = db.getAll();
		index = indexOfOldest(catList);
		deleted = db.remove(index);
		res.send('deleted: ' + JSON.stringify(deleted[0].name) + ' remaining: ' + JSON.stringify(db.getAll()));
	}
};


module.exports = routes;
