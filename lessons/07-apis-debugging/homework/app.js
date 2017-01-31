var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var twotes = require('./routes/twotes');
var users = require('./routes/users');
var auth = require('./routes/auth');
var app = express();

//==============================================================

var passport = require('passport');
var config = require('./oauth.js');
var FacebookStrategy = require('passport-facebook').Strategy;

// serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// config
passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));


app.use(passport.initialize());
app.use(passport.session());

// test authentication
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { 
		console.log("You are authenticated");
		return next(); 
	}
	console.log("You are not authenticated");
	res.redirect('/');
}

//======================================

// view engine setup
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes);
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
app.get('/account', ensureAuthenticated, function(req, res){
  res.json({});
});
app.use('/twotes', twotes);
app.use('/users', users);
app.use('/auth', auth);

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Application running on port: ", PORT);
});
