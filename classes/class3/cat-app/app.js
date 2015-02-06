var mongoose = require('mongoose');

var exphbs = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cats = require('./routes/cat-actions');

var express = require('express');
var index = require('./routes/index');
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);
app.get('/cats', index.home);
app.get('/cats/new', cats.new);
app.get('/cats/delete/old', cats.delete);
app.get('/cats/bycolor/black', cats.sort);
app.get('/cats/byage', cats.sort);

app.listen(3000);