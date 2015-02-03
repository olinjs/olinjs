var catData = require('../cat-creator');
var Cat = require('mongoose').model('Cat');

module.exports.showAll = function (req, res) {
	var pageData = {
		'page-title' : "All",
		'page-header': "All Cats",
		'page-subheader': "Sorted by Age"
	};

	// Get Cats from DB
	Cat.find()
	   .sort({age: 1})
	   .exec( function(err, cats) {
			if (err) {
				pageData.error = "Failed to locate cats!";
				res.render('listing', pageData);
				return console.error("Problem finding cats: " + cats, err);
			} else {
				pageData.data = cats;
				res.render('listing', pageData);
			}
	});
};

module.exports.sortColor = function (req, res) {
	var pageData = {
		'page-title' : "Color Filter",
		'page-header': "Cats",
		'page-subheader': "Filtered by Color"
	};

	// Get Color in URI
	var segments = req.url.split('/');
	var color = segments[segments.length-1];

	// Get Cats from DB & Sort
	Cat.find({color: color})
	   .sort({age: 1})
	   .exec( function (err, cats) {
		if (err) {
			pageData.error = "Failed to locate cats by color!";
			res.render('listing', pageData);
			return console.error("Problem finding cats by color: " + cats, err);
		} else {
			pageData.data = cats;
			res.render('listing', pageData);
		}
	});	
};

module.exports.create = function (req, res) {
	// Prime page-data
	var pageData = {
		'page-title' : "New"
	};

	// Create new DB entry
	var cat = catData.newCat();
	cat.save( function(err) {
		if (err) {
			pageData.error = "Kitten creation failed!";
			res.render('result', pageData);
			return console.error("Problem saving new cat: " + cat, err);
		} else {
			pageData.success = "Kitten created.";
			pageData.cat = [cat];
			res.render('result', pageData);
		}
	});
};

module.exports.remove = function (req, res) {
	// Prime page-data
	var pageData = {
		'page-title' : "Delete"
	};

	// Find oldest DB record and delete
	Cat.findOneAndRemove({}, {sort: {age: -1}}, function(err, cat) {
		if (err) {
			pageData.error = "Cat deletion failed!";
			res.render('result', pageData);
			return console.error("Problem deleting cat: " + cat, err);
		} else {
			pageData.success = cat.name + " sent to the country farm.";
			pageData.cat = [cat];
			res.render('result', pageData);
		}
	});
};