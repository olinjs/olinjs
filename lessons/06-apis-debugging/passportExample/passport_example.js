var express = require("express");
var path = require("path");
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');


var auth = require('./auth');

passport.use(new FacebookStrategy({
    clientID: auth.FACEBOOK_APP_ID,
    clientSecret: auth.FACEBOOK_APP_SECRET,
    callbackURL: auth.FACEBOOK_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
  	//probably want to have a user schema do User.find if none create
  	console.log(profile.name)
    // if (!profile) { return done(err); }
    done(null, profile);
  }
));

var app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: 'this is not a secret ;)',
	resave: false,
	saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
	// console.log(user);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
	// console.log(user);
  done(null, user);
});

app.get("/test", function(req, res) {
	res.send("LOL test\n");
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

app.get('/user', ensureAuthenticated, function(req, res) {
	res.send(req.user);
})

app.listen(3000);
console.log('Listening on Port 3000');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
    res.send(401)
}