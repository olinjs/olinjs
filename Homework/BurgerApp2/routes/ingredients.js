var mongoose = require('mongoose');
var Ingredient = require('../models/ingredientModel.js');

var routes = {};

var ObjectId = require('mongoose').Types.ObjectId; 

//Renders the page of ingredients
routes.getIngredients = function(req, res) {
  Ingredient.find({}, function(err, ingredients) {
    if (err) return console.error(err);
    res.render('ingredients', {'inStock': ingredients});
  });
};

//Adds a new ingredient to the db
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

//Changes an ingredient to out of stock in the database
routes.removeIngredient = function(req, res) {
  formId = req.body['formId'];
  Ingredient.findOneAndUpdate({'_id': formId}, {$set:{inStock: false}}, function(err, doc){
    if (err) return console.error(err);
    console.log(doc)
  });
  res.end();
}

//Changes an ingredient to in stock in the database
routes.addBackIngredient = function(req, res) {
  formId = req.body['formId'];
  Ingredient.findOneAndUpdate({'_id': formId}, {$set:{inStock: true}}, function(err, doc){
    if (err) return console.error(err);
    console.log(doc)
  });
  res.end();
}

//Saves the edited ingredient to the database
routes.editIngredient = function(req, res) {
  formId = req.body['formId'];
  name = req.body['name'];
  price = parseInt(req.body['price']);
  Ingredient.findOneAndUpdate({'_id': formId}, {$set:{name: name, price: price}}, function(err, doc){
    if (err) return console.error(err);
    console.log(doc)
  });
  res.end();
}

module.exports = routes;
