var mongoose = require('mongoose');
var Cat = require('../models/cat');

var firstNames = [
	'Raphael',
	'Donatello',
	'Michaelangelo',
	'Leonardo',
];

var lastNames = [
	'Emanything',
	'DiCaprio',
	'Katzenkaempfer',
	'Prettykitty',
	'Lasagna',
];

var all_colors = [
	'Chartreuse',
	'Puce',
	'Lavender',
	'Petunia',
	'Chrysanthamum',	
];

var maxAge = 17;

var maxColors = 4;

function randomFromArray(a) {
	return a[Math.floor(Math.random() * a.length)];
}

function randomAge() {
	return Math.round(Math.random() * maxAge);
}

function randomName() {
	return [randomFromArray(firstNames), randomFromArray(lastNames)].join(' ');
}

function randomColors() {
	var colors = [randomFromArray(all_colors)];
	for (var i = 1; i < maxColors; i++) {
		color = randomFromArray(all_colors);
		if (colors.indexOf(color) < 0) colors.push(color); 
	};
	return colors;
}

module.exports = {
	list: function(req, res) {
		Cat.find({})
		.sort({age: 1})
		.exec(function(err, cats){
			if (err) console.log('Error finding cats!', err);
			res.render('cats', {cats: cats});
		});
	},
	newCat: function(req, res){
		var cat = new Cat({
			name: randomName(),
			colors: randomColors(),
			age: randomAge(),
		});
		cat.save(function(err){
			if (err) console.log('Error saving cat!', err);
			res.redirect('/cats');
		});
	},
	byColor: function(req, res){
		Cat.find({colors: req.params.color})
		.sort({age: 1})
		.exec(function(err, cats){
			if (err) console.log('Error finding cats!', err);
			res.render('cats', {cats: cats});
		});
	},
	deleteOld: function(req, res){
		Cat.find({})
		.sort({age: -1})
		.exec(function(err, cats){
			cats[0].remove(function(err){
				if (err) console.log('Could not remove cat!', err);
				res.redirect('/cats');
			})
		})
	},
};