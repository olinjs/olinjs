var assert = require('assert');
var catData = require('./catData');
var mongojs = require('mongojs');
var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";

// http://mafintosh.github.io/mongojs/
var db = mongojs(mongoURI, ['cats']);

// FIXME: should check for existence of collection rather than hard create
db.createCollection('cats');

var insert = function (req, res) {

	// Create a random cat
	var randCat = {
		name: catData.names[Math.floor(Math.random()*catData.names.length)],
		age: Math.ceil(Math.random()*100),
		colors: (function() {
			var randColors = [];

			// choose 2 - 4 random colors
			var numColors = Math.ceil(Math.random()*3) + 1;

			for (var i = 0; i < numColors; i++) {
				var color = catData.colors[Math.floor(Math.random()*catData.colors.length)];
				randColors.push(color);
			}
			return randColors;
		})()
	};

	// insert cat into db
	db.cats.insert(randCat, function(err) {

		// find recently inserted cat, and show
		db.cats.findOne(randCat, function(err, cat) {
						
			res.render('cats', {cats: [cat]});

		});
			
	});	

};

var sortedByAge = function (req, res) {

	// find all cats and sort them by ascending age
  db.cats.find({}).sort({age: 1}, function(err, cats) {
	
  	res.render('cats', {cats: cats});

  });

};

var ofColorSortedByAge = function(req, res) {

	// res.params.color is defined here from app.js
	// sorted list of cats which whose colors may include a certain color
	db.cats
		.find({colors: req.params.color})
		.sort({age: 1}, function(err, cats) {

			res.render('cats', {cats: cats});

		});

}

var deleteOldest = function(req, res) {

	// TODO: when called, the /cats method does not work properly anymore.
	// find the maximum age
	var pipeline = [
		{ 
			$group: 
				{
					_id: 'oldest',
					maxAge: { $max: '$age' }
				}
		}
	];

	db.cats.aggregate(pipeline, function (err, cats) {
		
		db.cats.remove({age: cats[0].maxAge}, justOne=true, function(err, record) {

			if (record.n !== 1) console.error(err);

			res.send('A single cat just died from this world. ' +
				'The cat lived to be ' + cats[0].maxAge);
		
		});

	});

};

exports.insert = insert;
exports.sortedByAge = sortedByAge;
exports.ofColorSortedByAge = ofColorSortedByAge;
exports.deleteOldest = deleteOldest;