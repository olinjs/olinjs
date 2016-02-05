var express = require('express');
var router = express.Router();

// var Order = require('../public/models/models.js');
var Order = require('../public/models/models.js').orderModel;

router.post('/new', function(req, res) {
	var ingredients = req.body.ingredients;
	var price = req.body.price;

	if (ingredients.length && price > 0) {
		var newOrder = new Order(req.body); //Pls no injection attack por favor
		newOrder.save(function(err) {
			if (err) {
				console.log("Problem adding new order", err);
			}
		});
		res.json({"message": "Order Created"});
	}
});

router.get('/', function(req, res) {
	getOrdersQuery().exec(function(err, orders) {
		res.json(orders);
	});
});

router.delete('/remove', function(req, res) {
	Order.remove({_id: req.body.id}, function(err) {
		if(err) {
			console.log(err);
		}
	});
	getOrdersQuery().exec(function(err, orders) {
		res.json(orders);
	});
});

//Form a query that gets all ingredients in the database
function getOrdersQuery() {
	return Order.find({}, function(err) {
		if (err) {
			console.log("Problem fetching orders", err);
		}
	});
}

module.exports = router;