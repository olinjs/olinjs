var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var express = require('express');

var routes = require("./routes/index");

// MONGO
var mongoURI = process.env.MONGOURI || "mongodb://localhost/restaurant";
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
app.post('/addIngredient', routes.addIngredient);
app.post('/addOrder', routes.addOrder);
app.get('/ingredients', routes.ingredients_);
app.get('/orders', routes.orders_);
app.get('/kitchen', routes.kitchen_);

// LISTENING
var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log("Application running on port:", PORT);
});
