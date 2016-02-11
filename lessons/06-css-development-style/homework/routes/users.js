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