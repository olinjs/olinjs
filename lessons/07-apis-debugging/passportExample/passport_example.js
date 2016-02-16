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
    //This is not what you want to do here. 
    //Here you should search the connected DB if the user exists and load that in, or add it to db.
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
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get("/test", function(req, res) {
  res.send("LOL test\n");
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' })
);

app.get('/user', ensureAuthenticated, function(req, res) {
  res.send(req.user);
})

app.listen(3001);
console.log('Listening on Port 3001');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
    res.send(401);
}
