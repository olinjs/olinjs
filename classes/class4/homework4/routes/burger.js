var path = require('path');
var mongoose = require('mongoose');

//Defining schema for ingredients
var ingredSchema = mongoose.Schema({
	name: String,
	price: Number
});

var Ingredient = mongoose.model("Ingredient", ingredSchema);

/*
//pre-loading the DB with some ingredients
var beefPatty = new Ingredient({name: "beef patty", price: 3});
beefPatty.save();
var bun = new Ingredient({name: "bun", price: 0.5});
bun.save();
var lettuce = new Ingredient({name: "lettuce", price: 0.25});
lettuce.save();
var tomato = new Ingredient({name: "tomato", price: 0.25});
tomato.save();
var mushroom = new Ingredient({name: "mushroom", price: 0.25});
mushroom.save();
var onion = new Ingredient({name: "onion", price: 0.25});
onion.save();
var cheese = new Ingredient({name: "cheese", price: 0.5});
cheese.save();
var ketchup = new Ingredient({name: "ketchup", price: 0.05});
ketchup.save();*/


/*Shows a list of current ingredients (Name and Price) with Out-of-Stock and edit button.
Out-of-Stock button will tell the server to label the ingredient as disabled. 
(Optional: make it toggleable to "add" more of the ingredient.) 
The ingredient should be removed from the current page without refreshing.
Edit button allows the user to submit a new name or price for the ingredient 
which the server will update. The edits should change the ingredient list without refreshing.*/

//Shows the list of available ingredients
var ingredients = function (req, res) {
	Ingredient.find({}, function(err, ingList) {
		if (err) {
			console.error("Couldn't find ingredients", err);
		};
		res.render('ingredients', {'ingredients': ingList});
	});
};

var outOfStock = function (req, res) {
	var objID = req.body.id;

	Ingredient.findOneAndRemove({ _id : objID}, function(err, removedItem) {
		if (err) {
			console.error("Couldn't find and remove out of stock item", err);
		};
		console.log("removed " + removedItem);
		res.send('Removed ' + removedItem);
	});
};

var edit = function(req, res) {
	var objID = req.body.id;
	var newName = req.body.name;
	var newPrice = req.body.price;

	Ingredient.findOneAndUpdate( { _id: objID}, {name: newName, price: newPrice}, function(err, ingred, numberAffected) {
		if (err) {
			console.error("Couldn't update name and price", err);
		};
		console.log("the new name is " + ingred.name + " and the new price is " + newPrice);
		res.send(ingred);
	});
};

var addIngredient = function(req, res) {
	var newIngredient = new Ingredient({name: req.body.name, price: req.body.price});
	newIngredient.save( function(err, ingred, numberAffected) {
		if (err) {
			console.error("Couldn't save new item", err);
		};
		res.send('Added ingredient: ' + ingred.name);
	});

};




module.exports.ingredients = ingredients;
module.exports.outOfStock = outOfStock;
module.exports.edit = edit;
module.exports.addIngredient = addIngredient;
	



