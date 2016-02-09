var path = require('path');
var mongoose = require('mongoose');
var ordersModel = require('./../models/orderModel.js');
var ingredientModel = require('./../models/ingredientModel.js');
var routes = {};


routes.getOrders = function(req, res) {
	// ingredientModel.find().remove().exec();

	ingredientModel.find(function(err, data) {
	var ingredients = data;
	// console.log(ingredients);
	res.render("orders", {ingredients: ingredients});
	});
}


routes.placeOrders = function(req, res) {
	if(req.body){
		req.body.ingredients = req.body["ingredients[]"];
		console.log(req.body);
		var o = new ordersModel(req.body);
		o.save(function(err, data) {
	    	res.end("");
	});
	}
	else{
	    res.end("");
	}

}

module.exports = routes;
