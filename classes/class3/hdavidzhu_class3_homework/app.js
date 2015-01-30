var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var index = require('./routes/index');
var catRouter = require('./routes/cat-router');

var app = express();

// Template engine.
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Set our port
var port = process.env.PORT || 3000; 

// Mongoose instance and connection to our mongolab database.
var db = require('./db');

// Middleware.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routing.
app.get('/', index.home);
app.get('/cats/new', catRouter.newCat); // Creates new cat record.
app.get('/cats', catRouter.listCatByAge); // Shows a sorted list of cats by age.
app.get('/cats/bycolor/:color', catRouter.listCatByAgeColor); // Shows a sorted list of cats that have the specific color.
app.get('/cats/delete/old', catRouter.moveCatToFarm); // Remove eldest cat.

app.listen(port);