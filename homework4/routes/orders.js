var Ingredients = require('../models/ingredientModel.js');
var Orders = require('../models/orderModel.js');
var routes = {};
var total = 0;

routes.orders = function (req,res){
  Ingredients.find(function (err,ingredients){
    console.log(ingredients)
    res.render('order',{'ingredients':ingredients});
    return;
  });
}

routes.checkbox = function (req,res){
  Ingredients.findOne({_id: req.body.id}, function(err,data){
    console.log(req.body)
    if(err){console.log(err)};
    if (req.body.state == "true"){
      total+=data.price;
    }
    else{
      total-=data.price;
    }
    console.log(total);
    res.send({total: total})
    return;
  });
}

routes.newOrder = function (req,res){
  var ordered = req.body.ingredients.split(' ');
  ordered.splice(-1,1);
  var newOrder = new Orders({ingredients: ordered, price: total});
  total = 0;
  newOrder.save(function(err){
    if(err){console.log(err)};
    res.status(200);
  })
}

routes.showList = function(req,res){
  Orders.find(function(err,orders){
    res.render('kitchen',{'order':orders})
  })
}

routes.removeOrder = function(req,res){
  Orders.findOne({_id: req.body.id}).remove(function(err,data){
  });
  res.status(200);
}
module.exports = routes;
