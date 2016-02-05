var express = require('express');
var router = express.Router();

var Ingredient = require('../models/ingredientModel.js');



router.get('/ingredients', function(req, res, next){
    Ingredient.find({}, function(err, ingredients) {
    // var msg = "Ingredient names are: ";

    // ingredients.forEach(function(ingredient){
    //   msg = msg + ingredient.name + ",";
    // })

    // console.log(msg);
    res.render("ingredients", {allingredients: ingredients});
  })

});

router.get('/addIngredient', function(req, res, next) { //!!!
    var newname = req.query.name;
    var newprice = req.query.price;
    //console.log([newname, newprice]);

    var newingr = new Ingredient({name: newname, price: newprice});
    var id = newingr._id;
    //console.log(newingr.inStock);

    newingr.save(function(err) {
      if(err) console.log('Could not save');
    })

    //console.log([newname, newprice]);
    res.send([newname, newprice, id]);

});

router.get('/editIngredient', function(req, res, next) {
  //if null, substitute original name/price?
  var newname = req.query.name;
  var newprice = req.query.price;
  var id = req.query.id;
  console.log(newname, newprice, id);
  id = id.substring(0, id.length-10); //removes "-ajax-form" from id

  console.log(newname, newprice, id);

  Ingredient.findById(id, function (err, ingr) {
    if(err) console.log('Could not edit');
    console.log(ingr);
    ingr.update({ name: newname, price: newprice }).exec();
  });

  console.log(req.query);
  console.log([newname, newprice]);

  res.send([newname, newprice, id]);



});

router.get('/removeIngredient', function(req, res, next) {
  //console.log(req);
  console.log("Query " + req.query.id);
  //console.log(req.body);
  var id = req.query.id;
  id = id.substring(0, id.length-8); //removes "-ajax-form" from id

  console.log('removed ' + id);

  Ingredient.findByIdAndRemove(id, function (err,ingr) {
    if(err) console.log('Could not remove from database');
    //ingr.remove(id).exec();
  });


  res.send(id);

});


module.exports = router;