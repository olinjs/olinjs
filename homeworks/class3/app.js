/* REQUIRES */
// ...npm
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// ...local
var cats = require('./routes/cats.js');


/* CONFIG APP */
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// DB
mongoose.connect(process.env.MONGOLABURI || 'mongodb://localhost/test')


/* ROUTING */
app.get('/cats', cats.list);
app.get('/cats/new', cats.newCat);
app.get('/cats/bycolor/:color', cats.byColor);
app.get('/cats/delete/old', cats.deleteOld);

app.listen(process.env.PORT || 3000);