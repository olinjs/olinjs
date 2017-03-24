var mongoose = require('mongoose');
var Ingredient = require('../models/ingredientModel.js');

var routes = {};

routes.getIngredients = function(req, res) {
  Ingredient.find({}, function(err, ingredients) {
    if (err) return console.error(err);
    inStockIngs = [];
    outOfStockIngs = [];
    for (i=0; i<ingredients.length; i++) {
      if (ingredients[i].inStock) {
      	inStockIngs.push(ingredients[i]);
      }
      else {
      	outOfStockIngs.push(ingredients[i]);
      }
    }
    res.render('ingredients', {'inStock': ingredients});
  });
};

routes.addIngredient = function(req, res) { 
  var newIng = new Ingredient({
    name : req.body.ingredient,
    price : req.body.price,
    inStock : true
  });
  newIng.save(function(err, newIng) {
    if (err) return console.error(err);
  });  
  res.end();
};

routes.removeIngredient = function(req, res) {
  // Ingredient.findOneAndUpdate(req.)
}

module.exports = routes;
