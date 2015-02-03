var mongoose = require('mongoose');
var routes = {};
var Ingredient = require('./../models/ingredientModel.js');

routes.home = function(req, res){
	res.render("home");
}

routes.add = function(req,res){

	var nIngredient1 = new Ingredient({name:'tomato',
		price: 3.25,
		stock: true});
	nIngredient1.save(function(err){
		if(err){
			console.log("problem saving ingredient", err);
		}

		var nIngredient2 = new Ingredient({name:'patty',
			price: 1.00,
			stock: true});
		nIngredient2.save(function(err){
			if(err){
				console.log("problem saving ingredient", err);
			}

			var nIngredient3 = new Ingredient({name:'lettuce',
				price: 0.25,
				stock: true});
			nIngredient3.save(function(err){
			if(err){
				console.log("problem saving ingredient", err);
			}

			res.render("home", {'message': 'added ingredients'});
			});
		});
	});
}

routes.ingredients = function(req,res){
	

	Ingredient.find(function(err, ingredients){
		if(err){
			console.log("No ingredients", err);
		}
		res.render("ingredients", {ingList:ingredients});
	});
}


routes.order = function(req,res){
	res.render("home");
}


module.exports = routes;
