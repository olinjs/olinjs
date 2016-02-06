var express = require('express');
var router = express.Router();

var Order = require('../models/orderModel.js');


router.get('/kitchen', function(req, res, next) {
  Order.find({completed: false}, function(err, orders) {
    res.render("kitchen", {allorders: orders});
  })

});

router.get('/orderComplete', function(req, res, next) {
  orderid = req.query.id;
  orderid = orderid.substring(0, orderid.length-10); //removes "-completed" from id
  console.log('Order complete! ' + orderid);

  Order.findById(orderid, function(err, order) {
    if(err) console.log('Could not complete order');
    order.update({completed: true}).exec();
    //console.log('set instock to false');
  })

  res.send(orderid);

});

module.exports = router;