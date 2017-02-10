var exphbs = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var index = require('./routes/index');
var ingredients = require('./routes/ingredients');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ingredients');

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', index.home);
app.get('/ingredients', ingredients.getIngredients);
app.post('/ingredients/add', ingredients.addIngredient);
// app.post('/ingredients/remove', ingredients.removeIngredients);


app.listen(3000);