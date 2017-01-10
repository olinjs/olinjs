var path = require('path');
var mongoose = require('mongoose');
var ordersModel = require('./../models/orderModel.js');
var routes = {};


routes.getOrders = function(req, res) {
	// ingredientModel.find().remove().exec();

	ordersModel.find(function(err, data) {
	var orders = data;
	console.log(orders)
	res.render("kitchen", {orders: orders});
	});
}

routes.completeOrders = function(req, res) {
	console.log("completeOrders");
	console.log(req.body)
	if(req.body){
		ordersModel.findOneAndRemove({"_id": req.body.id}, function(err, data) {
			res.json(req.body.id);
		});
	}
	else{
	    res.end("");
	}
}

module.exports = routes;
