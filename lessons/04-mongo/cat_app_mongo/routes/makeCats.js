var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Cat');

var router = express.Router();
var db = require('../fakeDatabase');
var catData = require('./catData.js');
var catSchema = require('../models/models.js')

var catNames = catData.catNames;
var catColors = catData.catColors;

var Cat = mongoose.model('Cat', catSchema);

var cats = {};

// create new cat
cats.newCat = function(req, res) {
	var catAge = Math.floor((Math.random() * 40) + 1);
	var catName = catNames[Math.floor((Math.random() * (catNames.length)))];
	var catColor = catColors[Math.floor((Math.random() * (catColors.length)))];
	var newCat = new Cat({name: catName, age: catAge, color: catColor});
	newCat.save(function (err) {
  		if (err) {
    		console.log("Problem saving cat", err);
  		}
	});
	res.render('cats', {message: ["You've added "+ catName + ', a ' 
		+ catAge + ' year old, ' + catColor + ' cat!']});
};

//list all the cats
cats.catList = function(req, res) {
	var listFull = [];
	var listFinal = [];
	Cat.find({}, function(err, cats){
		for(var i = 0; i < cats.length; i++){
			listFull.push(cats[i]);
		};

		listFull.sort(function(a, b) {
	    	return parseFloat(a.age) - parseFloat(b.age);	
		});

		for(var i = 0; i < listFull.length; i++){
			listFinal.push([listFull[i].name + ', ' + listFull[i].age + ', ' +listFull[i].color]);
		};

 		res.render('cats', {message: 'Here are your cats:', listCats: listFinal});

		}); 
	
};


//sort cats by color
cats.sortColorPink = function(req, res) {
	var color = 'Pink';
	var listFull = [];
	var listFinal = [];
	Cat.find({color: color}, function(err, cats){
		for(var i = 0; i < cats.length; i++){
			listFull.push(cats[i]);
		};

		listFull.sort(function(a, b) {
	    	return parseFloat(a.age) - parseFloat(b.age);	
		});

		for(var i = 0; i < listFull.length; i++){
			listFinal.push([listFull[i].name + ', ' + listFull[i].age + ', ' +listFull[i].color]);
		};

 		res.render('cats', {message: 'Here are your cats:', listCats: listFinal});

		}); 

	}

//sort cats by color
cats.sortColorOrange = function(req, res) {
	var color = 'Orange';
	var listFull = [];
	var listFinal = [];
	Cat.find({color: color}, function(err, cats){
		for(var i = 0; i < cats.length; i++){
			listFull.push(cats[i]);
		};

		listFull.sort(function(a, b) {
	    	return parseFloat(a.age) - parseFloat(b.age);	
		});

		for(var i = 0; i < listFull.length; i++){
			listFinal.push([listFull[i].name + ', ' + listFull[i].age + ', ' +listFull[i].color]);
		};

 		res.render('cats', {message: 'Here are your cats:', listCats: listFinal});

		}); 

	}

//sort cats by color
cats.sortColorStripedGray = function(req, res) {
	var color = 'Striped Black and Gray';
	var listFull = [];
	var listFinal = [];
	Cat.find({color: color}, function(err, cats){
		for(var i = 0; i < cats.length; i++){
			listFull.push(cats[i]);
		};

		listFull.sort(function(a, b) {
	    	return parseFloat(a.age) - parseFloat(b.age);	
		});

		for(var i = 0; i < listFull.length; i++){
			listFinal.push([listFull[i].name + ', ' + listFull[i].age + ', ' +listFull[i].color]);
		};

 		res.render('cats', {message: 'Here are your cats:', listCats: listFinal});

		}); 

	}

//show cats if the first letter of their name is R or C
cats.findColorAge = function (req, res){
	var color = 'Beige';
	var listFull = [];
	var listFinal = [];
	Cat.find({
     		$or: [ {color: color}, { age: { $lt: 7 } } ]
   		}, function(err, cats){
		for(var i = 0; i < cats.length; i++){
			listFull.push(cats[i]);
		};

		listFull.sort(function(a, b) {
	    	return parseFloat(a.age) - parseFloat(b.age);	
		});

		for(var i = 0; i < listFull.length; i++){
			listFinal.push([listFull[i].name + ', ' + listFull[i].age + ', ' +listFull[i].color]);
		};

 		res.render('cats', {message: 'Here are your cats that are either younger than 7 or are Beige colored:', listCats: listFinal});

		}); 
}

//delete the oldest cat
cats.deleteCat = function(req, res) {
	var listFull = [];
	var oldestCat;
	Cat.find({}, function(err, cats){
		for(var i = 0; i < cats.length; i++){
			listFull.push(cats[i]);
		};

		if (listFull.length == 0){
			res.render('cats', {message: 'You have no more cats to give away.'});
		} else {

		listFull.sort(function(a, b) {
	    	return parseFloat(a.age) - parseFloat(b.age);	
		});
		

		oldestCat = listFull[listFull.length -1];
		Cat.remove({name: oldestCat.name, age: oldestCat.age, 
			color: oldestCat.color}, function (err) {
				res.render('cats', {message: 'You have given away:', message2: [oldestCat.name + ', ' + oldestCat.age + ', ' +oldestCat.color]});
		 		if (err) return handleError(err);
		});
	};
	});
};

module.exports = cats;