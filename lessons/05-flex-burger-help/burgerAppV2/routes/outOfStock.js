var path = require('path');
var Ingredient = require("../models/ingredientModel");

var routes = {}

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

module.exports = routes;