var path = require('path');
var Ingredient = require("../models/ingredientModel");
var Order = require("../models/orderModel");

var routes = {}

routes.getIngredients = function(req, res) {
	res.render("home");
}

routes.getOrder = function(req, res) {
	Ingredient.find({}, function (err, data) {
		res.render("order")
	});
}

routes.postAllIngredients = function(req, res) {
	Ingredient.find({}).sort({name:1}).exec(function(err, data) {
		if (err) {
			console.log(err);
		}
		else {
			res.json(data);
		}
	})
}

routes.postCheckedIngredient = function(req, res) {
	Ingredient.findOne({_id:req.body.checkId}).exec(function(err, data) {
		if (err) {
			console.log(err);
		}
		else {
			res.json(data);
		}
	})
}

routes.getKitchen = function(req, res) {
	res.render("kitchen");
}

routes.flush = function(req, res) {
	Ingredient.remove({}).exec(function(err, data) {
	res.send("deleted");		
	});
}

routes.postNewIngredients = function(req, res) {
	var body = req.body;
	Ingredient.create({name: body.name, amount: true, price: body.price}, function (err, data){
		data.save();
		console.log(data);
		res.json(data);
	});
}

routes.postOutOfStock = function(req, res) {
	var body = req.body;
	console.log(body.ingId);
	Ingredient.findOne({_id: body.ingId}, function(err, doc) {
		if (err) {
			console.log(err);
		}
		else {
			doc.amount = !(doc.amount);
			doc.save();
			res.json(doc);
		}
	});
}

routes.postNewOrder = function(req, res) {
	ingredientList = JSON.parse(req.body.ingredients);
	Order.create({ingredients: ingredientList, completed: false}, function (err, data){
		data.save();
		console.log(data);
		res.json(data);
	});
}

routes.postAllOrders = function(req, res) {
	Order.find({}).sort({name:1}).exec(function(err, data) {
		if (err) {
			console.log(err);
		}
		else {
			res.json(data);
		}
	});
}

routes.postRefIngredients = function(req, res) {
	var idList = JSON.parse(req.body.ids);
	var idChoices = [];
	for (var i = 0; i < idList.length; i++) {
		var idObj = {
			_id: idList[i]
		};
		idChoices.push(idObj);
	}

	Ingredient.find({$or:idChoices}, function(err, data) {
		if (err) {
			console.log(err);
		}
		else {
			console.log(data);
			res.json({names: data});
		}
	});
	// for (var i = 0; i < idList.length; i++) {
	// 	Ingredient.findOne({_id:idList[i]}, function(err, data) {
	// 		if (err) {
	// 			console.log(err);
	// 		}
	// 		else {
	// 			console.log(data.name);
	// 			names.push(data.name);
	// 			console.log('names', names);
	// 		}
	// 	});
	// }
	// console.log('names2', names);
	// res.json({names: names});
}
module.exports = routes;