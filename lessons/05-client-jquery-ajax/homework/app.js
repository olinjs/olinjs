var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var ingredientsRoute = require('./routes/ingredients');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/burgerStuff');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!")
});

app.get('/ingredients', ingredientsRoute.ingredients);

app.post('/addIngredient', ingredientsRoute.addIngredient);
app.post('/outIngredient', ingredientsRoute.outOfStockIngredient);
app.post('/reStockIngredient', ingredientsRoute.reStockIngredient);
app.post('/updateIngredient', ingredientsRoute.updateIngredient);


app.listen(3000);