var express = require('express');
var Ingredient = require('../models/ingredientModel.js');
var Order = require('../models/orderModel.js');
var router = express.Router();

module.exports = router;

var ordersGET = function(req, res) {
	Order.find().exec( function(err, orders) {
		console.log(orders)
		res.render("ordersView", {"orders": orders});
	})
}

var newOrderGET = function(req, res) {
	Ingredient.find().sort("-inStock").exec( function(err, ingredients) {
		console.log(ingredients)
		res.render("newOrderView", {"ingredients": ingredients});
	})
}

module.exports.orders = ordersGET;
module.exports.newOrder = newOrderGET;