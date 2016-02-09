var path = require('path');
var mongoose = require('mongoose');
var ingredientModel = require('./../models/ingredientModel.js');
var routes = {};


routes.getIngredients = function(req, res) {
	// ingredientModel.find().remove().exec();

	ingredientModel.find(function(err, data) {
	var ingredients = data;
	console.log(ingredients);
	res.render("ingredients", {ingredients: ingredients});
	});
}

	// var placeholderIngredient = {name: "beef", price: 20};

routes.addIngredients = function(req, res) {
	// var o = new ingredientModel(placeholderIngredient);
	// o.save(function(err) {
	// res.render("ingredients", {ingredients: placeholderIngredient});
	// });


	// ingredientModel.find().remove().exec();
	// console.log("addIngredients");
	var o = new ingredientModel(req.body);
	// console.log("before save" + req.body);
	o.save(function(err, data) {
		// var ingredient = data;
			// console.log(req.body);
	    	res.json(data);
	    	// console.log("data "+data)
	});
}

routes.updateIngredients = function(req, res) {
	console.log("updateIngredients");
	// var o = new ingredientModel(req.body);
	// console.log("before save" + req.body);
	if(req.body){
		ingredientModel.findById(req.body.id, function(err, data){
			if(err){
				console.log(err)
				res.end("");
			}
			else{
				// console.log(data);
				if (req.body.name){
					data.name = req.body.name;				
				}
				if (req.body.price){
					data.price = req.body.price;
				}
				data.save(function(err, data) {
				    	res.json(data);
				});
			}
		});
	}
	else{
		res.end("");
	}
}


routes.deleteIngredients = function(req, res) {
	console.log("deleteIngredients");
	// var o = new ingredientModel(req.body);
	// console.log("before save" + req.body);
	if(req.body){
		console.log(req.body.id);
		ingredientModel.findOneAndRemove({"_id": req.body.id}, function(err, data) {
		var message = "After deleting: ";
		res.json(req.body.id);
		
		});
	}
}

routes.outofStockIngredients = function(req, res) {
	console.log("outofStockIngredients");
	if(req.body){
		ingredientModel.findById(req.body.id, function(err, data){
			if(err){
				console.log(err)
				res.end("");
			}
			else{

				console.log(data);
				data.outofstock = true;
				data.save(function(err, data) {
				    	res.json(data);
				});
			}
		});
	}
	else{
		res.end("");
	}
}

routes.inStockIngredients = function(req, res) {
	console.log("inStockIngredients");
	if(req.body){
		ingredientModel.findById(req.body.id, function(err, data){
			if(err){
				console.log(err)
				res.end("");
			}
			else{

				console.log(data);
				data.outofstock = false;
				data.save(function(err, data) {
				    	res.json(data);
				});
			}
		});
	}
	else{
		res.end("");
	}
}

module.exports = routes;
