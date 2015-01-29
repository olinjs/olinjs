/* REQUIRES */
// ...npm
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// ...local
var index = require('./routes/index.js');


/* CONFIG APP */
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


/* ROUTING */
app.get('/ingredients', index.ingredients);
app.get('/order', index.order);
app.get('/kitchen', index.kitchen);

app.post('/fulfilled', index.fulfilledPOST);
app.post('/markOutOfStock', index.markOutOfStockPOST);
app.post('/markInStock', index.markInStockPOST);
app.post('/placeOrder', index.placeOrderPOST);
app.post('/editIngredient', index.editIngredientPOST);
app.post('/addIngredient', index.addIngredientPOST);

app.listen(process.env.PORT || 3000);