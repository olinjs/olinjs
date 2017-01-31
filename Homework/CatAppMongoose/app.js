var exphbs = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var index = require('./routes/index');
var cats = require('./routes/cats');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cats');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/', index.home);
app.get('/cats/new', cats.getCatsNew); 
app.get('/cats', cats.getCats);
app.get('/cats/bycolor/:color', function(req, res, next){
	next();
});
app.param('color', cats.getCatsByColor);

app.get('/cats/olderthan/:ageOlder', function(req, res, next){
	next();
});
app.param('ageOlder', cats.getCatsOlderThan);

app.get('/cats/youngerthan/:ageYounger', function(req, res, next){
	next();
});
app.param('ageYounger', cats.getCatsYoungerThan);

app.get('/cats/delete/old', cats.getCatsDeleteOld);

app.listen(3000);