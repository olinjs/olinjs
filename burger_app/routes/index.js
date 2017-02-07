var express = require('express');
var router = express.Router();
var Ingredient = require('../models/ingredientModel.js');

/*var createIngredient = function (req,res){
  var myIngredient = new Ingredient ();
  myIngredient.save(function (err, ingredient){
    if (err) return console.error(err);
  });
};*/

var home = function(req, res){
  res.render("home");
};

module.exports.home = home;
//module.exports.createIngredient = createIngredient;
