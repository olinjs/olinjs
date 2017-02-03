var Ingredients = require('../models/ingredientModel.js');
var routes = {};

routes.ingredients = function(req,res){
  Ingredients.find(function (err,ingredients){
    res.render('home',{'ingredients':ingredients});
  });
}

routes.addIngredient = function(req, res) {
  var newIngredient = new Ingredients({name: req.body.name, price: req.body.price, inStock:true});
  newIngredient.save(function(err){
    Ingredients.find(function(err, ingredients){
      res.status(200).send(newIngredient);
      return;
    })
  })
};

routes.outIngredient = function(req, res) {
  Ingredients.findOne({_id: req.body.id}, function(err,data){
    if(err){console.log(err)};
    data.inStock = false;
    data.save();
  });
  return;
};

routes.editIngredient = function(req,res){
  console.log(req.body);
  Ingredients.findOne({_id: req.body.id}, function(err,data){
    if(err){console.log(err)};
    data.name = req.body.name;
    data.price = req.body.price;
    data.save();
  });
  return;
}

module.exports = routes;
