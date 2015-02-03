var Ingredient = require('../model/ingredients');

// page request handler
module.exports = function (req, res) {
	var pageData = {
		page_title: 'Manage'
	};

	Ingredient.find()
		.sort('name')
		.exec(function(err, ingredients) {
			// Failure
			if (err) {
				res.sendStatus('500');
				return console.error("Failed to find full ingredient list: " + ingredients, err);
			}
			// Success
			pageData.ingredients = ingredients;
			res.render('management', pageData);
	});	
};

// post request handlers
model.exports.add = function (req, res) {
	var rq = req.query;
	var ingredient = new Ingredient({name: rq.name, price: rq.price, quantity: rq.quantity});
	ingredient.save(function (err) {
		// Failure
		if (err) {
			res.send('false');
			return console.error("Failed to save new ingredient: " + ingredient, err);
		}
		// Success
		res.send('true');
	});
};

model.exports.remove = function (req, res) {
	Ingredient.findOneAndRemove({name: req.query.name}, {}, function (err, ingredient) {
		// Failure
		if (err) {
			res.send('false');
			return console.error("Failed to find and remove ingredient by name: " + ingredient, err);
		}
		// Success
		res.send('true');
	});
};

module.exports.outOfStock = function (req, res) {
	Ingredient.find({name: req.query.name}, function (err, ingredient) {
		// Failure
		if (err) {
			res.send('false');
			return console.error("Failed to find ingredient by name: " + ingredient, err);
		}
		// Success
		ingredient.quantity = 0;
		res.send('true');
	});
};

module.exports.edit = function (req, res) {
	Ingredient.find({name: req.query.name}, function (err, ingredient) {
		// Failure
		if (err) {
			res.send('false');
			return console.error("Failed to find ingredient by name: " + ingredient, err);
		}
		// Success
		ingredient.name = req.query.newName;
		ingredient.price = req.query.newPrice;
		ingredient.quantity = req.query.quantity;
		res.send('true');
	});
};