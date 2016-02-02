var express = require('express');
var router = express.Router();

var Ingredient = require('../models/ingredientModel.js');



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

router.get('/addIngredient', function(req, res, next) {
    var newname = req.query.name;
    var newprice = req.query.price;
    console.log([newname, newprice]);

    var newingr = new Ingredient({name: newname, price: newprice});

    newingr.save(function(err) {
      if(err) console.log('Could not save');

    })

    Ingredient.find({}, function(err, ingredients) {
    var msg = "Ingredient names are: ";

    ingredients.forEach(function(ingredient){
      msg = msg + ingredient.name + ",";
    })

    console.log(msg);
    //res.render("ingredients", {allingredients: ingredients});
    console.log([newname, newprice]);
    res.send([newname, newprice]);


    //res.send([newingr.name, newingr.price]);
  })

});

module.exports = router;