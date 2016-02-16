// load all the things we need
var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../models/userModel.js');

// load the auth variables
var auth = require('./auth');

var createUserIfNotExists = function(facebookId, name) {
	console.log("createUserIfNotExists: " + name)
	User.findOne({"facebookId": facebookId}, function(err, user) {
		if (user == null) {
			console.log('new user')
			var newUser = User({"name": name, "facebookId": facebookId})
			newUser.save(function (err, newUser) {
				if (err) return console.error(err)
			});
			console.log(newUser)
		} else {
			console.log('existing user')
			console.log(user)
		}
	});

}

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
	passport.deserializeUser(function(user, done) {
		done(null, user);
	});

    passport.use(new FacebookStrategy({
	    clientID: auth.FACEBOOK_APP_ID,
	    clientSecret: auth.FACEBOOK_APP_SECRET,
	    callbackURL: auth.FACEBOOK_CALLBACK_URL
		},
		function(accessToken, refreshToken, profile, done) {
			console.log("profile:")
			console.log(profile)
			createUserIfNotExists(profile.id, profile.displayName)
		//This is not what you want to do here. 
		//Here you should search the connected DB if the user exists and load that in, or add it to db.
		done(null, profile);
		}
	));
};