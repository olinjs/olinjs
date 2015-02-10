// Models.
var Ingredient = require('../models/ingredient');
var Order = require('../models/order');


// Queries for all ingredients and sends them back to the client.
var sendIngredients = function (res) {
	Ingredient.find()
		.sort({name: 1})
		.exec(function (err, ingredients) {
			res.render("partials/ingredient-list", {
				layout: false,
				ingredients: ingredients
			})
		});
}

// Similar to sendIngredients. Sends ingredients rendered as order items.
var sendOrderItems = function (res) {
	Ingredient.find()
		.sort({name: 1})
		.exec(function (err, ingredients) {
			res.render("partials/ingredient-order-list", {
				layout: false,
				ingredients: ingredients
			})
		});
}

// Similar to sendIngredients. Sends ingredients rendered as order items.
var sendKitchenItems = function (res) {
	Order.find()
		.sort({name: 1})
		.exec(function (err, orders) {
			res.render("partials/kitchen-list", {
				layout: false,
				orders: orders
			})
		});
}

// Save the ingredients into the database.
var saveIngredient = function (res, newIngredient) {
	newIngredient.save(function (err) {
		if (err) console.log("Error: " + err);
		sendIngredients(res);
	});
}

// Save the order and return a success statement to client.
var saveOrder = function (res, personName, orderItems) {
	var newOrder = new Order({
		personName: personName,
		orderItems: orderItems
	});

	newOrder.save(function (err) {
		if (err) console.log("Error: " + err);
		res.render("partials/success-alert", {
			layout: false
		}, function (err,html){
			res.send(html);
		});
	})
}

module.exports = {
	
	getHome: function (req, res){
		res.render("base");
	},

	getIngredients: function (req, res){
		
		// Check if the request is AJAX.
		var is_ajax_request = req.xhr;
		if (is_ajax_request) {
			sendIngredients(res);
		} else {
			res.render("ingredients");
		}
	},

	postIngredients: function (req, res){
		
		// Find ingredient. If it doesn't exist, create a new ingredient.
		Ingredient.findOne({_id: req.body.id}, function (err, ingredient){
		  if (err) console.log("Error: " + err);
		  if (ingredient) {
		  	ingredient.name = req.body.name;
	  		ingredient.price = req.body.price;
		  } else {
		  	var ingredient = new Ingredient({
		  		name: req.body.name,
					price: req.body.price,
					instock: "yes"
		  	});
		  }
	  	saveIngredient(res, ingredient);
		});
	},

	// Change the state of the ingredient from being in and out of stock.
	toggleIngredient: function (req, res){
		Ingredient.findOne({ _id: req.body.id }, function (err, ingredient){
			if (err) console.log("Error: " + err);
			if (ingredient) {
				ingredient.instock = !ingredient.instock;
				saveIngredient(res, ingredient);
			} 
		});
	},

	getOrder: function (req, res){
		// Check if the request is AJAX.
		var is_ajax_request = req.xhr;
		if (is_ajax_request) {
			sendOrderItems(res);
		} else {
			res.render("order-page");
		}
	},

	postOrder: function (req, res){
		var personName = req.body.personName;

		// To prevent orderIDs from not becoming an array.
		var orderIDs = [];
		orderIDs = orderIDs.concat(req.body['orderIDs[]']);

		// Find all ingredients that match the ID of the order submitted.
		Ingredient.find({_id:{$in: orderIDs}}, function (err, ingredients){
			if (err) console.log("Error: " + err);

			// Save this order to the database.
			saveOrder(res, personName, ingredients);
		});
	},

	deleteOrder: function (req, res){
		var chosenOrderID = req.body.orderID;
		Order.find({_id: chosenOrderID})
			.remove()
			.exec( function (err) {
				if (err) console.log("Err: " + err);
				sendKitchenItems(res);
			});
	},

	getKitchen: function (req, res){
		// Check if the request is AJAX.
		var is_ajax_request = req.xhr;
		if (is_ajax_request) {
			sendKitchenItems(res);
		} else {
			res.render("kitchen-page");
		}
	},
}