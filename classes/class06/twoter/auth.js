var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
	function(username, password, done) {

		// Check database call here.
		// Pretend that this is using a real database!
		if (username === 'admin' && password === 'lynda') {
			return done(null, {username: 'admin'});
		}
		return done(null, false);
	}
));

passport.serializeUser(function(user, done) {
	done(null, user.username);
});

passport.deserializeUser(function(username, done) {
	done(null, {username: username});
});

module.exports = passport;