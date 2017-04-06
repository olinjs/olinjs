var path = require('path');
var User = require("../models/userModel");
var Twote = require("../models/twoteModel");

var routes = {};

routes.home = function(req, res) {
	console.log(req.session);
	if (req.session.passport) {
		User.find({}).sort({username: 1}).select({username: 1}).exec(function (err, users) {
			if (err) {
				console.error(err);
			} else if (users) {
				Twote.find({}).sort({time:-1}).exec(function (err, twotes) {
					if (err) {
						console.error(err);
					} else if (twotes) {
						var renderParams = {
							users: users,
							twotes: twotes,
							loggedIn: "logout"
						}
						if (req.session.passport == {}) {
							renderParams.loggedIn = "login";
						}
						res.render("home", renderParams);
					}
				})
			} else {
				res.render("home");
			}
		});
	} else {
		res.render('home');
	}
}

routes.loginPage = function(req, res) {
	res.render("login");
}

routes.newTwote = function(req, res) {
	if (req.session.passport) {
		Twote.create({username: req.session.passport.user.username, 
			content: req.body.text, time: req.body.time}, function (err, twote) {
			if (err) {
				console.error(err);
			} else {
				twote.save();
				var output = {
					username: twote.username,
					text: twote.content,
					time: twote.time,
					id: twote._id
				};
				res.json(output);
			}
		});
	} else {
		console.log("not logged in!");
		return("not logged in");
	}
}

routes.deleteTwote = function(req, res) {
	if (req.session.passport) {
		Twote.findOne({_id: req.body.id}).exec(function(err, twote) {
			if (err) {
				console.error(err);
			}
			console.log('TWOTE', twote.username, '\nUSER', req.session.passport.user.username)
			console.log(twote.username == req.session.passport.user.username);
			if (twote.username == req.session.passport.user.username) {
				twote.remove();
				res.json({deleted: true});
			} else {
				res.json({deleted: false});
			}
		}
		);
	}
	else {
		res.json({deleted: false});
	}
}

routes.ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
    res.send(401);
}

routes.logout = function (req, res) {
	console.log(req.logout)
	req.logout()
	res.render("home", {loggedIn: "login"})
}

routes.login = function (req, res) {
	res.redirect('/');
}

routes.register = function (req, res) {
	User.register(new User({username: req.body.username}), req.body.password, function(err, account) {
		if (err) {
			return res.render("login", {});
		}

		passport.authenticate('login', function(req, res) {
			console.log('redirecting');
			res.redirect('/');
		});
	});
}

module.exports = routes;


