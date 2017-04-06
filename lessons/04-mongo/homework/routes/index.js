/*
This file is for creating routes for the cat app. 
*/ 
var express = require('express'); // to make handling routes much easier
var Cat = require('../models/catModel.js');
var db = require('../fakeDatabase.js');
var bodyParser = require('body-parser');

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

// object of the functions that handle routes
var routes = {

	// home page welcome message
	home: function(req, res, next) {
		res.render("home");
	},

	// adds a cat with random qualities
	new: function(req, res, next) {
		var catName = chooseName();
		var catAge = randAge();
		var catColors = chooseColors();
		var cat = new Cat({name: catName, age:catAge, colors: catColors});
		cat.save(function(err){
			if (err) {
				console.log("could not save %s :(", catName)
			}
		})
		var cats = {cats: cat}
		res.render("new", cats);
	},

	// lists all cats in database by age
	cats: function(req, res, next) {
		Cat.find({}).sort({age: 1}).exec(function(err, data) {
			if (err) {
				console.log('could not get cats');
			}
			else if (data) {
				console.log(data);
				var cats = {cats: data};
				res.render("all", cats);
			}
			else {
				console.log('empty database')
			}
		});
	},

	// lists all cats in database of a specified color by age
	color: function(req, res, next) {
		var color = req.params.color;
		Cat.find({colors: color}).sort({age: 1}).select({name: 1, age: 1, colors:1}).exec(function(err, data) {
			if (err) {
				console.log('could not get cats');
			}
			else {
				console.log(data);
				var cats = {cats: data};
				res.render("all", cats);
			}
		});
	},

	// sends the oldest cat in the database to a very nice farm
	old: function(req, res, next) {

		Cat.findOne().sort({age: -1}).exec(function(err, data) {
			if (err) {
				console.log(err);
			}

			else if (data) {
				console.log(data);
				cats = {cats: data};
				res.render("deleted", cats)
				data.remove(function (err, removed) {
					console.log("Empty database");
				});
			}

			else {
				console.log('empty list');
			}
		})
	},

	// gives cats that have  n colors including the specified color
	nColors: function(req, res, next) {
		var n = req.params.n;
		var color = req.params.color;
		Cat.find({$and: [{colors: {$size: n}}, {colors: color}]}).sort({age: 1}).exec(function(err, data) {
			if (err) {
				console.log("error getting cats");
			}

			else if (data) {
				console.log(data);
				var cats = {cats: data};
				res.render("all", cats);
			}
		});
	}
};


module.exports = routes;
