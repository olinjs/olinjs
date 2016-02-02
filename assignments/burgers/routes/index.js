var express = require('express');
var router = express.Router();

var Ingredient = require('../models/ingredientModel.js');

//get all lizard names
router.get('/ingredients', function(req, res, next){

  Ingredient.find({}, function(err, ingredients) {
    var msg = "Ingredient names are: ";
    ingredients.forEach(function(ingredient){
      msg = msg + ingredient.name + ",";
    })
    console.log(msg);
    res.render("ingredients", {allingredients: ingredients});
  })

});




module.exports = router;