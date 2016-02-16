var express = require('express');
var router = express.Router();

var Twote = require('../public/models/models.js').twoteModel;

// Send list of all twotes
router.get('/', function(req, res) {
	getTwotesQuery().exec(function(err, twotes) {
		if (req.isAuthenticated()) {
			// console.log("YOU ARE AUTHENTICATED");
			res.json(twotes);
		} else {
			// console.log("YOU ARE NOT AUTHENTICATED");
			res.json({});
		}
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
	res.json(JSON.stringify({"status": "OK" }));
});

//Form a query that gets all twotes in the database
function getTwotesQuery() {
	return Twote.find({}, function(err) {
		if (err) {
			console.log("Problem fetching twotes", err);
		}
	});
}

module.exports = router;