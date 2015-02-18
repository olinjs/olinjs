var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');
var routes = {};

routes.fbAuth = function(req, res){
};

routes.fbAuthCallback = function(req, res) {
	var usersName = req.session.passport.user.displayName
	User.findOne({username: usersName}, function(error, user){
		if(error){
			console.log(error);
		};
		if(user){
			console.log('Returning User', user)
			req.session.username = user.username;
			res.redirect('/');
		} else {
			console.log('New User')
			var newUser = new User({username: usersName, twits: []});
			console.log(newUser)
			newUser.save();
			req.session.username = usersName;
			res.redirect('/');
		};
	});
};

module.exports = routes;