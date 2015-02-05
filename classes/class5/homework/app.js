var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var index = require('./routes/index.js')

var app = express();

//Set up mongolab and PORTS to work locally and on heroku
var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
mongoose.connect(mongoURI);
var PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/ingredients', index.ingredients);
app.get('/order', index.order);
app.post('/order_submit', index.order_submit);
app.post('/edit_ingredients', index.edit_ingredients);
app.post('/add_ingredient', index.add_ingredient);
app.get('/kitchen', index.kitchen);
app.get('/stock_kitchen', index.stock_kitchen);

app.listen(PORT, function(){
    console.log("Application running on port:", PORT);
});
