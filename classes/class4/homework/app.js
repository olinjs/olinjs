var path = require('path');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();

var PORT = process.env.PORT || 3000;
var mongoURI = process.env.MONGOURI || 'mongodb://localhost/test';

//html render engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get('/', index.home);
app.get('/ingredients', index.ingredients);
app.get('/order', index.order);
app.get('/kitchen', index.kitchen);

app.post('/done', index.done);
app.post('/outOfStock', index.outOfStock);
app.post('/inStock', index.inStock);
app.post('/placeOrder', index.placeOrder);
app.post('/editIngredient', index.editIngredient);
app.post('/addIngredient', index.addIngredient);

mongoose.connect(mongoURI);

app.listen(PORT, function() {
  console.log('Node running on: ', PORT);
});