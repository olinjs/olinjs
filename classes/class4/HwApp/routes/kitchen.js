var mongoose = require('mongoose');
var ingredients = require('../models/ingredient');
var burgers = require('../models/burgers');

var mongoURI = process.env.MONGOURI || "mongodb://127.0.0.1:27017/test";
mongoose.connect(mongoURI);

var Ingredient = mongoose.model('Ingredient', ingredients.ingredientsSchema);
var Burger = mongoose.model('Burger', burgers.burgersSchema);

var getIngredients = function(req, res){
	Ingredient.find().sort({available: 1}).exec(function (err, ingredients){
         res.render('getIngredients', {"ingredients": ingredients});
    });
}

var postIngredient = function(req, res){
    console.log(req.body);
    Ingredient.findOne({_id:req.body.id}, function (err, ingredient){
        ingredient.name = req.body.newName;
        ingredient.price = req.body.price;
        ingredient.available = req.body.available;
        
        console.log(ingredient.name);
        console.log(ingredient.price);
        console.log(ingredient.available);

        ingredient.save(function (err){
            if(err){
                console.log(err);
            } else {
	            Ingredient.find().sort({available: 1}).exec(function (err, ingredients){
                     res.render('getIngredients', {"ingredients": ingredients});
                 });
            }
        });
    });
}

var newOrder = function(req, res){
	Ingredient.find().sort({available: 1}).exec(function (err, ingredients){
    	res.render('newOrder', {"ingredients": ingredients});
    });
}

var postOrder = function(req, res){
    var ingredients = [];
    for(var i=0; i<req.body.ingredients.length; i++){
        Ingredient.findOne({name: req.body.ingredients[i]}, function (err, ingredient){
            ingredients.push(ingredient);
         });
    }

    var order = new Burger ({ingredients: ingredients});

    order.save(function (err){
        if (err){
            console.log(err);
        }
    });
}

var getOrders = function(req, res){
	res.render('getOrders', {"orders": orders});
}

module.exports.getIngredients = getIngredients;
module.exports.newOrder = newOrder;
module.exports.getOrders = getOrders;
module.exports.postIngredient = postIngredient;

