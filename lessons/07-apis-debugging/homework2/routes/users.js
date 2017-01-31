var express = require('express');
var router = express.Router();

var User = require('../public/models/models.js').userModel;

// Send list of all users
router.get('/', function(req, res) {
	getUsersQuery().exec(function(err, users) {
		res.json(users);
	});
});

// Add new user to database
router.post('/new', function(req, res) {
	var new_user = new User(req.body);

	User.find({name: req.body.name}, function(err, users) { // Add to database only if no user with username exists
		if (users.length == 0) {
			new_user.save(function(err) {
				if (err) {
					console.log("Problem adding new order", err);
				}
			});
		}
	});
	res.json(JSON.stringify({"status": "OK" }));
});

// I'm not able to add twotes to your db (see comment on pull request),
// so I wrote this route to add dummy tweets to test your UI
router.get('/populate', function(req, res) {
	var first_user = new User({
	  name: "somebody"
	});
	first_user.save(function(err, user) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(user);
		}
	});
});

//Form a query that gets all users in the database
function getUsersQuery() {
	return User.find({}, function(err) {
		if (err) {
			console.log("Problem fetching users", err);
		}
	});
}

module.exports = router;
