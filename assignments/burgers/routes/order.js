var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Ingredient = require('../models/ingredientModel.js');
var Order = require('../models/orderModel.js');

router.get('/order', function(req, res, next){
  //console.log('Order page');

  // Order.find({}, function(err, orders) {
  //   res.render("order", {allorders: orders});
  // })

  // Ingredient.find({}, function(err, ingredients) {
  //   res.render("order", {allingredients: ingredients});
  // })

  Ingredient.find({inStock: true}, function(err, instock) {
    Ingredient.find({inStock: false}, function(err, outofstock) {
      res.render("order", {instockingr: instock, outofstockingr: outofstock});
    })

  })

});


// router.get('/createOrder', function(req, res, next) { //!!!
//     var newname = req.query.name;

//     var orderingrs = req.query.ingredients;
//     console.log("Ingredients " + orderingrs);

//     var neworder = new Order({name: newname, ingredients: orderingrs});
//     var id = neworder._id;
//     console.log("Order Ingredients " + neworder.ingredients);

//     neworder.save(function(err) {
//       if(err) console.log('Could not save');
//     })

//     Order
//       .find({})
//       .populate('ingredients')
//       .exec(function(err, orders) {
//         console.log("The first order's ingredient is " + orders[0].ingredients[0].name);
//       });
//     res.send([newname, orderingrs, id]);

// });

router.get('/createOrder', function(req, res, next) { //!!!
    var newname = req.query.name;

    var orderingrs = req.query.ingredients;
    //console.log("Ingredients " + orderingrs);

    var neworder = new Order({name: newname, ingredients: orderingrs});
    var id = neworder._id;
    //console.log("Order Ingredients " + neworder.ingredients);

    neworder.save(function(err) {
      if(err) console.log('Could not save');
    })


    //there must be a better way
    function callback() {
      //console.log("Ingredient Name Array " + ingrnames);
      res.send([newname, ingrnames, id]);
    } 

    //oh god why
    var ingrnames = [];
    var itemsProcessed = 0;
    orderingrs.forEach(function(ingrid) {
      Ingredient.findById(ingrid, function(err, ingr) {
        //console.log(ingr.name);
        ingrnames.push(ingr.name);
        itemsProcessed++;
        if(itemsProcessed === orderingrs.length) callback();
      })
    });

});

/*interesting decision to do this on the back end. 
It is better to only make a POST request with the full 
order that you build out on the client.
*/
router.get('/addItemToOrder', function(req, res, next) {
  var orderingrs = req.query.ingredients;
  //console.log(orderingrs);

    //there must be a better way
  function callback() {
    //console.log("Ingredient Cost " + ingrcost);
    res.send([ingrcost]);
  } 

  //oh god why
  var ingrcost = 0;
  var itemsProcessed = 0;
  //by the way this ends up breaking if you check and uncheck an ingredient. 
  orderingrs.forEach(function(ingrid) {
    Ingredient.findById(ingrid, function(err, ingr) {
      //console.log(ingr.price);
      ingrcost += ingr.price;
      itemsProcessed++;
      if(itemsProcessed === orderingrs.length) callback();
    })
  });

  //res.send([ingrs.length]);

})

module.exports = router;