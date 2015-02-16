var express = require('express');
var router = express.Router();

// Models
var Author = require('../models/author');
var Twote = require('../models/twote');

router.get('/', function(req, res, next) {
	var message;
	if (req.session.counter) {
	    req.session.counter++;
	    message = "Hello again! Thanks for visiting " + req.session.counter + " times";
	} else {
	    message = "Hello, thanks for visiting this site!";
	    req.session.counter = 1;
	}

	console.log(message);

	// console.log(req.headers.cookie);
	console.dir(req.session);
  res.render('main', {
  	isAuthenticated: req.isAuthenticated(),
  	user: req.user
  });
});

router.post('/', function (req, res) {
	console.log(req.body.twote);
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/login/register', function(req, res) {
	var authorName = req.body.name;
	var authorPass = req.body.password;

	// Look if the user already exists.
	Author.find({name: authorName})
		.exec(function (err, authors){
			if (err) throw err;
			
			// If not, let's make a new account.
			if (authors.length === 0) {
				var newAuthor = new Author ({
					name: authorName,
					password: authorPass
				});
				newAuthor.save(function (err){
					if (err) throw err;
				});
			}
		});
});

module.exports = router;