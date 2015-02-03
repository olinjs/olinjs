var path = require('path');
var routes = require('./routes/index')

var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');

var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
mongoose.connect(mongoURI);

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// ROUTES
app.get('/', routes.index_);
app.get('/cats/new', routes.new_);
app.get('/cats', routes.cats);
app.get('/cats/bycolor/:color', routes.bycolor);
app.get('/cats/bycolor', routes.helper);
app.get('/cats/delete/old', routes.delete_);

var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});
