var mongoose = require('mongoose');
var Ingredient = require('../models/ingredientModel.js');
var Order = require('../models/orderModel.js');

var routes = {};

routes.getOrders = function(req, res) {
  Ingredient.find({}, function(err, ingredients) {
    if (err) return console.error(err);
    res.render('orders', {'ingredients': ingredients});
  });
};

module.exports = routes;