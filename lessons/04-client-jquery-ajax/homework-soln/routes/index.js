var mongoose = require('mongoose');
var Ingredient = require('./../models/ingredientModel.js');
var Order = require('./../models/orderModel.js');

/* DEFINE ROUTE CALLBACKS */
var routes = {};

routes.home = function(req, res) {
	res.render('message', {'message':'Welcome!'});
}

routes.ingredients = function(req, res) {
// query for all ingredients, separate by availability, and render
	Ingredient.find({}, function(err, data) {
		// separate in stock & out of stock
		var inData = [];
		var outData = [];
		data.forEach(function(d) {
			var list = d.inStock ? inData : outData;
			list.push(d);
		});

		// package data and render
		var hbsData = {'inStock':formatPrice(inData), 
					   'outOfStock':formatPrice(outData)};
		res.render('ingredients', hbsData);
	});

	
}

routes.order = function(req, res) {
// query for all ingredients and render
	Ingredient.find(function(err, data) {
		var hbsData = {'ingredients':formatPrice(data)};
		res.render('order', hbsData);
	});
}

routes.kitchen = function(req, res) {
// query for all orders and render
	Order.find(function(err, data) {
		var hbsData = {'orders':data};
		res.render('kitchen', hbsData);
	});
}

routes.markOutOfStock = function(req, res) {
// mark an ingredient out of stock
	var ingredientId = req.body.id;
	Ingredient.update({'_id':ingredientId}, {'inStock':false}, function(err, num, data) {
		res.end(ingredientId);
	});
}

routes.markInStock = function(req, res) {
// mark an ingredient in stock
	var ingredientId = req.body.id;
	Ingredient.update({'_id':ingredientId}, {'inStock':true}, function(err, num, data) {
		res.end(ingredientId);
	});
}

routes.fulfilled = function(req, res) {
// remove an order
	var orderId = req.body.id;
	Order.findOneAndRemove({'_id': orderId}, function(err, data) {
		res.end(orderId);
	});
}

routes.placeOrder = function(req, res) {
// add an order
	// Process data - sort through customer name and ingredients
	var data = req.body;
	var customer = 'No name provided';
	var ingredients = [];
	for (key in data) {
		if (key == 'customer') {
			customer = data[key];
		} else {
			ingredients.push(key);
		}
	}

	// Package and save to db
	var hbsData = {'customer':customer, 
				   'ingredients':ingredients,
				   'ingredientStr':formatList(ingredients)};

	var o = new Order(hbsData);
	o.save(function(err) {
		res.render('message', {'message':'Thanks for your order!'});
	});
}

routes.editIngredient = function(req, res) {
	var updated = req.body;
	Ingredient.update({'_id':updated.id}, updated, function(err, num, data) {
		res.end(JSON.stringify(updated));
	});
}

routes.addIngredient = function(req, res) {
	// create ingredient
	var newIngr = req.body;
	newIngr.inStock = true;
	var i = new Ingredient(newIngr);

	// check if ingredient exists already
	Ingredient.count({'name':newIngr.name}, function (err, count) {
		if (!count) {
			// not a duplicate - save
			i.save(function(err) {
				// find in database - need _id for client-side purposes
				Ingredient.findOne(newIngr, function(err, data) {
					res.json(data);
				});
			});
		} else {
			// don't save duplicate
			res.end();
		}
	});
}

module.exports = routes;


/* HELPER FUNCTIONS */
function formatPrice(data) {
// input: data - array of json objects w/ price properties
// output: same array of json objects, w/ 2-decimal-place-formatted prices
	return data.map(function(d) {
		var priceStr = d.price.toFixed(2).toString();
		var copy = JSON.parse(JSON.stringify(d));
		copy.price = priceStr;
		return copy;
	});
}

function formatList(arr) {
// input: arr [a, b, c]
// output: string "a, b, and c"
	switch(arr.length) {
		case 0:
			return "No ingredients";
			break;
		case 1:
			return arr[0];
			break;
		case 2:
			return arr[0] + " and " + arr[1];
			break;
		default:
			var arrClone = arr.slice(0); // avoid modifying original array
			var last = arrClone.pop();
			return arrClone.join(", ") + ", and " + last;
			break;
	}
}