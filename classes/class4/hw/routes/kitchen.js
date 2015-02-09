var routes = {};
var Order = require('../models/orderModel');

routes.kitchenRender = function(req,res){
	Order.find({},function(err, orders){
		if (err){
			console.log(err);
		};
		res.render('kitchen', {order: orders})
		console.log('orders',orders)
	});
};

routes.orderComplete = function(req,res){
	console.log('id', req.body.order)
	Order.findOneAndRemove({ _id: req.body.order }, function(){
		console.log('Done');
		res.send(req.body.order);
	});
};

module.exports = routes;