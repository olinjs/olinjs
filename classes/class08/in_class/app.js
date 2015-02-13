var express = require('express');
var session = require('express-session');
var path = require('path');

// routes
var index = require('./routes/index');

var mongoose = require('mongoose');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}));

// mongo
var db = mongoose.connection;
db.on('error', console.error);

mongoose.connect('mongodb://localhost/test');

// routes
app.get('/', index.home);

app.listen(3000);