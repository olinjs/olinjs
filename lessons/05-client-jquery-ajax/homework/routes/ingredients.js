var express = require('express');
var Ingredient = require('../models/ingredientModel.js');
var router = express.Router();

module.exports = router;

var ingredientsGET = function(req, res) {
	Ingredient.find().exec( function(err, ingredients) {
		var inStock = ingredients.filter(function(x) {return x.inStock});
		var outOfStock = ingredients.filter(function(x) {return !x.inStock});
		console.log(inStock)
		res.render("ingredientsView", {"inStock": inStock, "outOfStock": outOfStock});
	})
}

var addPOST = function(req, res) {
	var newIngredient = Ingredient({"name": req.body.name, "price": Number(req.body.price) ,"inStock": true});
	newIngredient.save(function (err, newIngredient) {
		if (err) return console.error(err)
	});
	res.send(newIngredient);
}

var updatePOST = function(req, res) {
	console.log(req.body);
	Ingredient.findById(req.body.id, function (err, ingredient) {
		ingredient.name = req.body.name;
		ingredient.price = Number(req.body.price);
		ingredient.save(function (err, ingredient) {
			if (err) {return console.error(err)} 
			else {res.send(ingredient)}
		});
	});
}

var outOfStockPOST = function(req, res) {
	Ingredient.findById(req.body.id, function (err, ingredient) {
		ingredient.inStock = false;
		ingredient.save(function (err, ingredient) {
			if (err) {return console.error(err)} 
			else {res.send(ingredient)}
		});
	});
}

var reStockPOST = function(req, res) {
	Ingredient.findById(req.body.id, function (err, ingredient) {
		ingredient.inStock = true;
		ingredient.save(function (err, ingredient) {
			if (err) {return console.error(err)}
			else {res.send(ingredient)}
		});
	});
}


module.exports.ingredients = ingredientsGET;
module.exports.addIngredient = addPOST;
module.exports.outOfStockIngredient = outOfStockPOST;
module.exports.reStockIngredient = reStockPOST;
module.exports.updateIngredient = updatePOST;