var express = require('express');
var router = express.Router();
// var db = require('../fakeDatabase.js');
var Ingredient = require('../public/models/ingredientModel.js');

//Create new ingredient or update existing one
router.post('/new', function(req, res) {
	var newIngredient = new Ingredient(req.body);
	Ingredient.find({name: req.body.name}, function(err, ingredients) {
		if (ingredients.length > 0) {
			newIngredient = ingredients[0]; //Hijack var and update existing database entry with new price
			newIngredient.price = req.body.price;
			newIngredient.stock = true; //Also set ingredient to be in stock
		}
		newIngredient.save(function(err) {
			if (err) {
				console.log("Problem adding new cat", err);
			}
		});
		getIngredientsQuery().exec(function(err, ingredients) {
			res.json(ingredients);
		});
	});

	
});

//Return list of all ingredient objects
router.get('/', function(req, res) {
	getIngredientsQuery().exec(function(err, ingredients) {
		res.json(ingredients);
	});
});

//Toggle availability of ingredient
router.post('/stock', function(req, res) {
	var name = req.body.name;
	Ingredient.find({name: name}, function(err, ingredients) {
		if (err) {
			console.log("Problem toggling stock of ingredient ", err);
		} else {
			if (ingredients.length == 1) {
				var ingredient = ingredients[0];
				ingredient.stock = !ingredient.stock;
				ingredient.save(function(err) {
					if (err) {
						console.log("Problem toggling stock of ingredient, problem updating ingredient ", err);
					}
				});
			} else {
				console.log("Problem toggling stock of ingredient, multiple ingredients with name: ", name, ".");
				console.log(ingredients);
			}
		}
	});
});

//Remove ingredient from database
router.delete('/remove', function(req, res) {
	Ingredient.remove({name: req.body.name}, function(err) {
		if(err) {
			console.log(err);
		}
	});
	getIngredientsQuery().exec(function(err, ingredients) {
		res.json(ingredients);
	});
});

//Form a query that gets all ingredients in the database
function getIngredientsQuery() {
	return Ingredient.find({}, function(err) {
		if (err) {
			console.log("Problem fetching ingredients", err);
		}
	});
}

module.exports = router;