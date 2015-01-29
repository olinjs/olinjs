/* CONNECT TO MONGOOSE */
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOURI || 'mongodb://localhost/test');


/* DEFINE SCHEMAS */
var ingredientSchema = mongoose.Schema({
	name: String,
	price: Number,
	inStock: Boolean
});
var Ingredient = mongoose.model('Ingredient', ingredientSchema);

var orderSchema = mongoose.Schema({
	customer: String,
	ingredients: Array,
	ingredientStr: String
});
var Order = mongoose.model('Order', orderSchema);


/* DEFINE ROUTE CALLBACKS */
var routes = {};

routes.ingredients = function(req, res) {
// query for in stock & out of stock ingredients separately and render
	Ingredient.find({'inStock':true}, function(err, inData) {
		Ingredient.find({'inStock':false}, function(err, outData) {
			var hbsData = {'inStock':formatPrice(inData), 
						   'outOfStock':formatPrice(outData)};
			res.render('ingredients', hbsData);
		});
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

routes.markOutOfStockPOST = function(req, res) {
// mark an ingredient out of stock
	var ingredientId = req.body.id;
	Ingredient.update({'_id':ingredientId}, {'inStock':false}, function(err, num, data) {
		res.end(ingredientId);
	});
}

routes.markInStockPOST = function(req, res) {
// mark an ingredient in stock
	var ingredientId = req.body.id;
	Ingredient.update({'_id':ingredientId}, {'inStock':true}, function(err, num, data) {
		res.end(ingredientId);
	});
}

routes.fulfilledPOST = function(req, res) {
// remove an order
	var orderId = req.body.id;
	Order.findOneAndRemove({'_id': orderId}, function(err, data) {
		res.end(orderId);
	});
}

routes.placeOrderPOST = function(req, res) {
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
		res.render('thankyou');
	});
}

routes.editIngredientPOST = function(req, res) {
	var updated = req.body;
	Ingredient.update({'_id':updated.id}, updated, function(err, num, data) {
		res.end(JSON.stringify(updated));
	});
}

routes.addIngredientPOST = function(req, res) {
	// create ingredient
	var data = req.body;
	data.inStock = true;
	var i = new Ingredient(data);

	// check if ingredient exists already
	Ingredient.count(req.body, function (err, count) {
		if (!count) {
			// not a duplicate - save
			i.save(function(err) {
				// find in database - need _id for client-side purposes
				Ingredient.findOne(req.body, function(err, data) {
					res.end(JSON.stringify(data));
				});
			});
		} else {
			// don't save duplicate
			res.end('{}');
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