var mongoose = require('mongoose');
var path = require('path');
var express = require('express');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var ingredients = require('./routes/ingredients')
// var ingredient = require('./models/ingredientModel')

var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
var PORT = process.env.PORT || 3000;
mongoose.connect(mongoURI);


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', ingredients.addIngredients);
app.post('/newIngredient', ingredients.addIngredientsPOST);
app.get('/ingredients', ingredients.ingredientsRender);
app.post('/edit', ingredients.editIngredients);
app.post('/outOfStock', ingredients.outOfStock)
app.get('/order');
app.get('/kitchen');


app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});