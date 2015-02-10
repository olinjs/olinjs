var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');

var app = express();
var favicon = require('serve-favicon');

var burgerRouter = require('./routes/burger-router.js');

// Template engine.
app.engine('.hbs', exphbs({
	extname: '.hbs',
	defaultLayout: 'layout'
}));

app.set('view engine', '.hbs');

// Set our port
var port = process.env.PORT || 3000; 

// Mongoose instance and connection to our mongolab database.
var db = require('./db');

// Middleware.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));

// Routing.
app.get('/', burgerRouter.getHome);
app.get('/ingredients', burgerRouter.getIngredients);
app.post('/ingredients', burgerRouter.postIngredients);
app.post('/toggle-ingredient', burgerRouter.toggleIngredient);

app.get('/order', burgerRouter.getOrder);
app.post('/order', burgerRouter.postOrder);

app.get('/kitchen', burgerRouter.getKitchen);
app.post('/kitchen', burgerRouter.deleteOrder);

app.listen(port);