var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');

var index = require('./routes/index');
var ingredients = require('./routes/ingredients');
var kitchen = require('./routes/kitchen');
var order = require('./routes/order');


var app = express();

// view engine setup
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', index);
app.get('/ingredients', ingredients.listAll);
// app.get('/kitchen', kitchen);
// app.get('/order', order);


var mongoURI = process.env.MONGOURI || "mongodb://localhost/Ingredient";
mongoose.connect(mongoURI);

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Application running on port: ", PORT);
});
