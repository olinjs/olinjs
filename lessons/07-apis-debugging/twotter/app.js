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

// file containing facebook authorization parameters
var auth = require('./auth');
// file containing routes
var index = require("./routes/index");

var app = express();
app.use(express.static(path.join(__dirname, "public")));


app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

passport.use(new FacebookStrategy({
    clientID: auth.FACEBOOK_APP_ID,
    clientSecret: auth.FACEBOOK_APP_SECRET,
    callbackURL: auth.FACEBOOK_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({username: profile.displayName}, function (err, user) {
      console.log('user', user);
      if (err) { return done(err);}
      if (!user) {return done(null, false)}
      return done(null, user);
    })
  }
));

passport.use(new LocalStrategy(User.authenticate()));

app.use(express.static(path.join(__dirname, "public")));
app.use(session({ 
  secret: 'this is not a secret ;)',
  resave: false,
  saveUninitialized: false
  }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// should only load twotes when logged in
app.get("/", index.home);

// logs in to Facebook
app.get('/auth/facebook',
  passport.authenticate('facebook')
);

// redirects to homw if the user can log in, otherwise redirects to login page
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' })
);

// displays info about which user is logged in
app.get('/user', index.ensureAuthenticated, function(req, res) {
  res.send(req.user);
});

// reroutes to login page
app.get('/login', index.loginPage);

app.post('/login', passport.authenticate('local'), index.login)

app.post('/register', function (req, res) {
  User.register(new User({username: req.body.username}), req.body.password, function(err, account) {
    if (err) {
      return res.render("login", {});
    }

    passport.authenticate('login', function(req, res) {
      res.redirect('/');
    });
  });
})
// creates a new twote
app.post('/new', index.newTwote);

// deletes a twote
app.post('/delete', index.deleteTwote);

// log out user
app.get('/logout', index.logout);

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Application running on port: ", PORT);
});