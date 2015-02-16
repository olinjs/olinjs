var express = require('express');
var router = express.Router();

// Models
var Author = require('../models/author');
var Twote = require('../models/twote');

var sendTwotes = function (res){
	Twote.find()
		.sort({_id: -1})
		.exec(function (err, twotes) {
			res.render("partials/twote", {
				layout: false,
				twotes: twotes
			})
		});
};

router.get('/', function(req, res, next) {

	var is_ajax_request = req.xhr;
	if (is_ajax_request) {
		sendTwotes(res);
	} else {

		req.session.authorName = "David";
		req.session.author_id = "12345";

		// var message;
		// console.log("This is a test: " + req.session.test);
		// if (req.session.counter) {
		//     req.session.counter++;
		//     message = "Hello again! Thanks for visiting " + req.session.counter + " times";
		// } else {
		//     message = "Hello, thanks for visiting this site!";
		//     req.session.counter = 1;
		// }

		// console.log(message);

		// console.log(req.headers.cookie);
		console.dir(req.session);
	  res.render('main', {
	  	isAuthenticated: req.isAuthenticated(),
	  	user: req.user
	  });
	}
});

router.post('/', function (req, res) {
	// console.log(req.body.twote);

	var newTwote = new Twote({
		twote: req.body.twote,
		author_id: null
	});

	newTwote.save(function (err) {
		if (err) return console.error(err);
  	sendTwotes(res);
	});
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