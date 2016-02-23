var express = require('express');
var ingredients = require('./routes/ingredients');
var order = require('./routes/order');
var kitchen = require('./routes/kitchen');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/ingredients');

//hmmm... probably shouldn't have all the routes be get req.
app.get('/ingredients', ingredients);
app.get('/addIngredient', ingredients); //!!!!
app.get('/editIngredient', ingredients);
app.get('/removeIngredient', ingredients);

app.get('/order', order);
app.get('/createOrder', order);
app.get('/addItemToOrder', order);

app.get('/kitchen', kitchen);
app.get('/orderComplete', kitchen);

// app.get('/', index.home);
// app.get('/fun', index.fun);
// app.get('/hello', index.hello);

app.listen(3000);