var path = require('path');
var mongoose = require('mongoose');
var Ingredient = require(path.join(__dirname, '../models/ingredient'));
var Order = require(path.join(__dirname, '../models/order'));

var routes = {};

routes.home = function(req, res) {
  res.render('home', {'body': 'Hello!'});
}

routes.order = function(req, res) {
  Ingredient.find(function(err, food) {
    res.render('order', {'customer': customer,
                         'ingredients': ingredients});
  });
}

routes.kitchen = function(req, res) {
  Order.find(function(err, food) {
    res.render('kitchen', {'orders': food});
  });
}

routes.ingredients = function(req, res) {
  Ingredient.find({}, function(err, food) {
    var input = [];
    var output = [];
    food.forEach(function(s) {
      var list = s.stock ? input : output;
      list.push(s);
    });
    res.render('ingredients', {'stock': input,
                               'nostock': output});
  })
}

routes.done = function(req, res) {
  var orderId = req.body.id;
  Order.findOneAndRemove({'id': orderId}, function(err, food) {
    res.end(orderId);
  });
}

routes.outOfStock = function(req, res) {
  var ingredientId = req.body.id;
  Ingredient.update({'id': ingredientId},
                    {'stock': false},
                    function(err, num, food) {
                      res.end(ingredientId);
                    });
}

routes.inStock = function(req, res) {
  var ingredientId = req.body.id;
  Ingredient.update({'id': ingredientId},
                    {'stock': true},
                    function(err, num, food) {
                      res.end(ingredientId);
                    });
}

routes.placeOrder = function(req, res) {
  var customer = '';
  var ingredients = [];
  var data = req.body;
  for (key in data) {
    if (key == 'customer') {
      customer = data[key];
    } else {
      ingredients.push(key);
    }
  }
}

routes.editIngredient = function(req, res) {
  var updated = req.body;
  Ingredient.update({'id': updated.id}, updated, 
                    function(err, num, data) {
                      //what here???
                    })
}

routes.addIngredient = function(req, res) {
  var newIngredient = req.body;
  newIngredient.stock = true;
  var ingr = new Ingredient(newIngredient);
  Ingredient.count({'name': newIngredient.name},
                   function(err, food) {
                    ingr.save(function(err) {
                      //and stuck again
                    });
                   });
}

module.exports = routes;