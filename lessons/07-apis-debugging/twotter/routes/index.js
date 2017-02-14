var path = require('path');
var User = require("../models/userModel");
var Twote = require("../models/twoteModel");

var routes = {};

routes.home = function(req, res) {
	console.log(req.session.user)
	User.find({}).sort({username: 1}).select({username: 1}).exec(function (err, users) {
		if (err) {
			console.error(err);
		} else if (users) {
			Twote.find({}).sort({time:-1}).exec(function (err, twotes) {
				if (err) {
					console.error(err);
				} else if (twotes) {
					console.log(twotes, "twotes");
					var renderParams = {
						users: users,
						twotes: twotes,
						loggedIn: "logout"
					}
					if (req.session.user) {
						renderParams.loggedIn = "login"
					}
					console.log(renderParams.loggedIn)
					res.render("home", renderParams);
				}
			})
		} else {
			res.render("home")
		}
	});
}

routes.loginPage = function(req, res) {
	res.render("login");
}

routes.newTwote = function(req, res) {
	console.log(req.session.user)
	Twote.create({username: req.session.user.username, content: req.body.text, time: req.body.time}, function (err, twote) {
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
		})
}

routes.deleteTwote = function(req, res) {
	Twote.find({_id: req.body.id}).remove().exec(function(err, twote) {
		if (err) {
			console.error(err);
		}
	});
}

routes.ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
    res.send(401);
}

routes.logout = function (req, res) {
	req.logout()
	res.redirect('/')
}


module.exports = routes;


