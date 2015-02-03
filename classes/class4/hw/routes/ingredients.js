var routes = {};
var mongoose = require('mongoose');

var ingredientSchema = mongoose.Schema({
	name: String,
	price: Number,
	available: String
});
var Ingredient = mongoose.model('Ingredient', ingredientSchema);

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
		}
	});
}

routes.editIngredients = function(req, res){

};

routes.outOfStock = function(req, res){

};

module.exports = routes;