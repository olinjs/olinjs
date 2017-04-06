var path = require('path');
var User = require("../models/userModel");
var Twote = require("../models/twoteModel");

var routes = {};

routes.home = function(req, res) {
	User.find({}).sort({username: 1}).select({username: 1}).exec(function (err, users) {
		if (err) {
			console.error(err);
		} else if (users) {
			Twote.find({}).sort({time:-1}).exec(function (err, twotes) {
				if (err) {
					console.error(err);
				} else if (twotes) {
					console.log(twotes, "twotes");
					res.render("home", {users: users, twotes: twotes});
				}
			})
			// res.render("home", {users: usernames});
		} else {
			res.render("home")
		}
	});
}

routes.loginPage = function(req, res) {
	res.render("login");
}

routes.loginAuthenticate = function(req, res) {
	User.findOne({username: req.body.username}, function(err, user) {
		if (!user) {
			User.create({username: req.body.username}, function (err, newUser) {
				if (err) {
					console.error(err);
				} else {
					newUser.save();
					console.log("new user created: %s", newUser.username);
					req.session.user = newUser;
					res.send({redirect: '/'});
				}
			})
		} else {
			console.log("user", user);
			req.session.user = user;
			res.send({redirect: '/'});
		}
	});
}

routes.newTwote = function(req, res) {
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

module.exports = routes;
