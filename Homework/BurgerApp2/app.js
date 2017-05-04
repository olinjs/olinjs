var exphbs = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');

var index = require('./routes/index');
var ingredients = require('./routes/ingredients');
var orders = require('./routes/orders');
var kitchen = require('./routes/kitchen');

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
app.post('/ingredients/remove', ingredients.removeIngredient);
app.post('/ingredients/addBack', ingredients.addBackIngredient);
app.post('/ingredients/edit', ingredients.editIngredient);
app.get('/orders', orders.getOrders);
app.post('/orders/newOrder', orders.newOrder);
app.get('/kitchen', kitchen.getKitchen);
app.post('/kitchen/completeOrder', kitchen.completeOrder);

app.listen(3000);