var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs  = require("express-handlebars");
var mongoose = require('mongoose');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var User = require("./models/userModel");



mongoose.connect('mongodb://localhost/twotter');

var auth = require('./auth');

var index = require("./routes/index");

var app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: 'this is not a secret ;)',
  resave: false,
  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
	cookieName: 'session',
	secret: 'random-string',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
}));

passport.use(new FacebookStrategy({
    clientID: auth.FACEBOOK_APP_ID,
    clientSecret: auth.FACEBOOK_APP_SECRET,
    callbackURL: auth.FACEBOOK_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    //This is not what you want to do here. 
    //Here you should search the connected DB if the user exists and load that in, or add it to db.
    done(null, profile);
  }
));

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
		console.log(user);
		if (err) { return done(err); }
		if (!user) { return done(null, false); }
		if (!(user.verifyPassword(password))) { return done(null, false); }
		return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get("/", index.home);
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' })
);

app.get('/user', index.ensureAuthenticated, function(req, res) {
  res.send(req.user);
});

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
app.get('/login', index.loginPage);

app.post('/new', index.newTwote);
app.post('/delete', index.deleteTwote);

app.get('/logout', index.logout);

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Application running on port: ", PORT);
});