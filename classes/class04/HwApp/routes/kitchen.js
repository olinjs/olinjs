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
    Ingredient.findOne({_id:req.body.ingredient_id}, function (err, ingredient){
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
                res.json({name: ingredient.name});
            }
        });
    });
}

var newIngredient = function(req, res){
    console.log(req.body);
    ingredient = new Ingredient();
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
            res.json({"id":ingredient.id});
        }
    });
}

var newOrder = function(req, res){
	Ingredient.find().sort({available: 1}).exec(function (err, ingredients){
    	res.render('newOrder', {"ingredients": ingredients});
    });
}

var postOrder = function(req, res){
    var order = new Burger ();
    order.ingredients = req.body['ingredientList[]'];
    console.log(order.ingredients);
    order.save(function (err){
        if (err){
            console.log(err);
        } else {
            res.json({status: "ordered"});
        }
    });
}

var deleteOrder = function(req, res){
    console.log(req.body.order_id);
    Burger.find({_id:req.body.order_id}).remove(function (err){
        if (err){
            console.log(err);
        } else {
            res.json({status: "done"})
        }
    });
}

var getOrders = function(req, res){
    Burger.find().exec(function (err, orders){
    	res.render('getOrders', {"orders": orders});
    });
}

module.exports.getIngredients = getIngredients;
module.exports.newOrder = newOrder;
module.exports.getOrders = getOrders;
module.exports.postOrder = postOrder;
module.exports.postIngredient = postIngredient;
module.exports.newIngredient = newIngredient;
module.exports.deleteOrder = deleteOrder;
