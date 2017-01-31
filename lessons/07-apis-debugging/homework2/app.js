var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var session = require('express-session');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var twotes = require('./routes/twotes');
var users = require('./routes/users');
var auth = require('./routes/auth');
var app = express();
var passport = require('passport');
var config = require('./oauth.js');
var FacebookStrategy = require('passport-facebook').Strategy;

// Here's a good StackOverflow post which explains serializeUser and deserializeUser:
// http://stackoverflow.com/a/19283692
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Passport setup -- provide the library with your Facebook auth credentials
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

// view engine setup -- lets you use Handlebars for templating when you res.render(...)
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// middleware -- all of your requests pass through this stack in order before they get to your routing
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  genid: function(req) {
    return genuuid() // use UUIDs for session IDs
  },
  secret: 'waow'
}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

// You mentioned in the submission survey that you weren't sure about some of the setup --
// it looks good to me! Commented to explain what things are doing, if that's helpful
// to you

app.get('/', routes);

app.get('/logout', function(req, res){
	console.log("User " + req.user.displayName + " logged out");
	req.logout();
	res.redirect('/');
});

app.use('/twotes', twotes);
app.use('/users', users);
app.use('/auth', auth);

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Application running on port: ", PORT);
});

// test authentication
// do you ever use this function?
// usually you'd do something like:
// app.get('/someRoute', ensureAuthenticated, function(req, res) {
//    (stuff you need to be authenticated to see)
// })
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		console.log("You are authenticated");
		return next();
	}
	console.log("You are not authenticated");
	res.redirect('/');
}

function genuuid() {
	var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}
