var express = require('express');
var Ingredient = require('../models/ingredientModel.js');
var Order = require('../models/orderModel.js');
var router = express.Router();

module.exports = router;

var ordersGET = function(req, res) {
	Order.find({complete: false}).populate('ingredients').exec( function(err, orders) {
		res.render("ordersView", {"orders": orders});
	})
}

var newOrderGET = function(req, res) {
	Ingredient.find().sort("-inStock").exec( function(err, ingredients) {
		console.log(ingredients)
		res.render("newOrderView", {"ingredients": ingredients});
	})
}

var submitOrderPOST = function(req, res) {
	console.log(req.body);
	console.log(req.body['ingredients[]']);
	var newOrder = Order({"name": req.body.name, "total":req.body.total, "ingredients": req.body['ingredients[]']})
	newOrder.save(function (err, newOrder) {
		if (err) return console.error(err)
	});
	res.send(newOrder);
}

var completeOrderPOST = function(req, res) {
	console.log(req.body);
	Order.findById(req.body.id, function (err, order) {
		order.complete = true;
		order.save(function (err, order) {
			if (err) {return console.error(err)} 
			else {res.send(order)}
		});
	});
}

module.exports.orders = ordersGET;
module.exports.newOrder = newOrderGET;
module.exports.submitOrder = submitOrderPOST;
module.exports.completeOrder = completeOrderPOST;