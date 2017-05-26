var express = require('express');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var routes = require('./routes/index');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var PORT = process.env.PORT || 3000;
var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
mongoose.connect(mongoURI);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req,res) {
	res.render('home');
});

app.get('/cats/new', routes.newCat);

app.get('/cats', routes.sortCats);

app.get('/cats/bycolor/:color', routes.sortColor);

app.get('/cats/delete/old', routes.deleteCat);

app.listen(PORT);
