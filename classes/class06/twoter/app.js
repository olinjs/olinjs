var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var session = require('express-session');

var mongoose = require('mongoose');
var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
mongoose.connect(mongoURI);

passport = require('./auth');
app = express();

// Template engine.
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'layout'
}));
app.set('view engine', '.hbs');

// Set middleware.
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'cTofTbEF2CNWdUT',
  // store: require('mongoose-session')(mongoose),
  resave: false,
  saveUninitialized: true
}));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes');
module.exports = app;