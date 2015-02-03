// Utility Imports
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var schema = require('./schema');
var fs = require('fs');

// Route Imports
var index = require('./routes/index');
var cats = require('./routes/cats');

// Config
var app = express();
var mongoURI = process.env.MONGO_URI || "mongodb://localhost/test";
var PORT = process.env.PORT || 3000;
mongoose.connect(mongoURI);
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Page Routing
app.get('/', index.home);
app.get('/cats', cats.showAll);
app.get('/cats/new', cats.create);
app.get('/cats/bycolor/*', cats.sortColor);
app.get('/cats/delete/old', cats.remove);

// Listen
app.listen(PORT);
