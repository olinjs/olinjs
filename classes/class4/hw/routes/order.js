var routes = {};
var Ingredient = require('../models/ingredientModel');
var Order = require('../models/orderModel');

routes.orderSubmit = function(req,res){
	console.log('order', req.body);
	console.log(names);
	var names = req.body.name;
	
	if (typeof names === "string"){
		Ingredient.findOne({name: names}, function(err,doc){
			var ingredientList = [];
			ingredientList.push(doc);
			var order = new Order({ingredients: ingredientList});
			order.save();
			res.send(order);
		});
	}
	else{
		var ingredientList = names.map(function(ingredientName){
			Ingredient.findOne({name: ingredientName}, function(err,doc){
				return doc;
			});
		});
		var order = new Order({ingredients: ingredientList});
		order.save();
		res.send(order);
	};
};

routes.orderRender = function(req,res){
	Ingredient.find({available: 'In Stock'},function(err, ingredient){
		if (err){
			console.log(err);
		};
		res.render('order', {'stuff': ingredient});
		console.log(ingredient);
	});	
};



module.exports = routes;