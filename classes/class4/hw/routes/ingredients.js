var routes = {};
// var mongoose = require('mongoose');
var Ingredient = require('../models/ingredientModel')
// var ingredientSchema = mongoose.Schema({
// 	name: String,
// 	price: Number,
// 	available: String
// });
// var Ingredient = mongoose.model('Ingredient', ingredientSchema);

routes.ingredientsRender = function(req, res){
	Ingredient.find({available: 'In Stock'},function(err, ingredients){
		res.render('ingredients', {'ingredients': ingredients});
		console.log(ingredients);
	});	
};

routes.addIngredients = function(req,res){
	res.render('home')
};

routes.addIngredientsPOST = function(req, res){
	console.log('add')
	console.log(req.body);
	res.send(makeIngredient(req.body));
};

var makeIngredient = function(params){
	var ingredient = new Ingredient({name: params.name, 
							price: params.price,
							available: params.available
							});
	ingredient.save(function(err){
		if (err){
			console.log("Problem adding Ingredient", err);
		};
	});
	return ingredient;
};

routes.editIngredientsPOST = function(req, res){
	console.log(req.body);
	Ingredient.findOne({_id: req.body._id}, function(err, doc){
		console.log(doc);
		doc.name = req.body.name;
		doc.price = req.body.price;
  		doc.save();
  		res.send(doc);
	});
	
};


routes.outOfStockPOST = function(req, res){
	console.log(req.body);
	Ingredient.findOne({_id: req.body._id}, function(err, doc){
		console.log(doc);
		if (doc===null){
			Ingredient.remove({id:req.body._id},function(err,doc2){
				console.log(doc2);
				res.end("Error bad Doc");
			});
			res.end();
		}
		else{
			doc.available = "Out of Stock";
			doc.save();
			res.send(doc);
		}
	});
};

module.exports = routes;