var express = require('express');
var expressHb = require('express-handlebars'); 

var index = require('./routes/index');
var cats = require('./routes/cats');

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var app = express();

app.engine('handlebars', expressHb({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);

app.get('/cats', cats.catList);

app.get('/cats/new', cats.addCat);

app.get('/cats/delete/old', cats.removeCat);

app.get('/cats/bycolor/:color', cats.sortedCats);

var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
mongoose.connect(mongoURI);

var PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});