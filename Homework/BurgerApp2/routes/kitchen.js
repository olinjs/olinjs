var mongoose = require('mongoose');
var Ingredient = require('../models/ingredientModel.js');
var Order = require('../models/orderModel.js');

var routes = {};

//renders the kitchen page
routes.getKitchen = function(req, res) {
  Order.find({}, function(err, orders) {
    if (err) return console.error(err);
    res.render('kitchen', {'orders': orders});
  });
};

//allows the user to mark an order as completed
routes.completeOrder = function(req, res) {
  Order.findOneAndUpdate({'_id': req.body.id}, {$set:{completed: true}}, function(err, doc) {
    if (err) return console.error(err);
    console.log(doc)
  });
  res.end();
};

module.exports = routes;