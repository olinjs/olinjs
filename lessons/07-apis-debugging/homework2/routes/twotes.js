var express = require('express');
var router = express.Router();

var Twote = require('../public/models/models.js').twoteModel;

// Send list of all twotes
router.get('/', function(req, res) {
	getTwotesQuery().exec(function(err, twotes) {
		if (req.isAuthenticated()) {
			res.json(twotes);
		} else {
			// Should you be able to see twotes even if you aren't
			// authenticated? (see but not post)
			res.json({});
		}
	});
});

// Add new twote to database
router.post('/new', function(req, res) {
	var new_twote = new Twote(req.body);
	new_twote.save(function(err) {
		if (err) {
			// Better to do this:
			res.status(500).json(err);
		}
		// Better to do this inside the save callback -- that way you don't
		// send an OK message if there's an error while saving
		res.json(JSON.stringify({"status": "OK" }));
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

// I'm not able to add twotes to your db (see comment on pull request),
// so I wrote this route to add dummy tweets to test your UI
router.get('/populate', function(req, res) {
	var first_twote = new Twote({
	  author: "somebody",
	  text: "something",
	  time: 3
	});
	first_twote.save(function(err, twote) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(twote);
		}
	});
});

module.exports = router;
