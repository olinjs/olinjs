//You should section and comment this file into packages, middleware, mongo-related stuff, auth stuff, routes stuff, etc.
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs  = require("express-handlebars");
var session = require("express-session");
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;

var twote = require("./routes/twote.js");

var mongoose = require('mongoose');

var app = express();

var auth = require('./auth');
var authenticate = require("./authentication")(passport);

mongoose.connect('mongodb://localhost/twote');

var PORT = 3000;

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use(session({ secret: 'i have a secret',
  cookie: {},
  resave: false,
  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

//fb stuff
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/twotes',
                                      failureRedirect: '/' })
);

//if user signed in, go to twotes page
app.get("/",function(req,res){
  console.log(req.session);
  console.log(req.session.passport);
  var sess = req.session;
  if(!sess.passport){
    res.redirect("/login");
  } else {
    res.redirect("/twotes");
  }
});

//Your local login doesn't work, because you aren't hooking your login form to anything.
app.get("/login", twote.login);
app.get("/twotes", twote.twoteshome);
app.post("/postTwote", twote.addTwote);
app.post("/deleteTwote", twote.deleteTwote);
app.get('/logout',function(req,res){
  req.logout();
  res.redirect("/login");
})

app.listen(PORT, function() {
  console.log("App running on port:", PORT);
});
