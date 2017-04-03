var mongoose = require('mongoose');
var Ingredient = require('../models/ingredientModel.js');
var Order = require('../models/orderModel.js');

var routes = {};

//Renders the orders in the database
routes.getOrders = function(req, res) {
  Ingredient.find({}, function(err, ingredients) {
    if (err) return console.error(err);
    res.render('orders', {'ingredients': ingredients});
  });
};

//Saves a new order to the database
routes.newOrder = function(req, res) {
  console.log(req.body)
  var newOrder = new Order({
    ingredients : req.body['ingredients[]'],
    price : req.body.price,
    completed: false
  });
  newOrder.save(function(err, newOrder) {
    if (err) return console.error(err);
  });  
  res.end();
}

module.exports = routes;