var express = require('express');
var router = express.Router();

var Twote = require('../public/models/models.js').twoteModel;

// Send list of all twotes
router.get('/', function(req, res) {
	getTwotesQuery().exec(function(err, twotes) {
		res.json(twotes);
	});
});

// Add new twote to database
router.post('/new', function(req, res) {
	var new_twote = new Twote(req.body);
	new_twote.save(function(err) {
		if (err) {
			console.log("Problem adding new twote", err);
		}
	});
});

//Form a query that gets all twotes in the database
function getTwotesQuery() {
	return Twote.find({}, function(err) {
		if (err) {
			console.log("Problem fetching twotes", err);
		}
	});
}