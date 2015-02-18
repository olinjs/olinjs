var routes = {};
var Ingredient = require('../models/ingredientModel');
var Order = require('../models/orderModel');

routes.orderSubmit = function(req,res){
	console.log('order', req.body);
	var names = req.body.name;
	console.log(names);
	// if (typeof names === "string"){
	// 	Ingredient.findOne({name: names}).lean().exec(function(err,doc){
	// 		var ingredientList = [];
	// 		ingredientList.push(doc);
	// 		var order = new Order({ingredients: ingredientList});
	// 		order.save();
	// 		res.send(order);
	// 	});
	// }
	// else{
		// var ingredientList = names.map(function(names){
		// 	var stuff = []
		// 	Ingredient.findOne({name: names}, function(err,doc){
		// 		stuff.push(doc);
		// 	});
		// 	return stuff;
		// });
		// console.log('ingredients', ingredientList);
	var order = new Order({ingredients: names});
	order.save();
	res.send(names);
	// };
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

// {available: 'In Stock'}

module.exports = routes;