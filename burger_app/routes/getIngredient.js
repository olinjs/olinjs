var Ingredients = require('../models/ingredientModel.js');
var routes = {};

//displaying instock ingredients
routes.ingredients = function(req,res){
  Ingredients.find(function (err,ingredients){
    var myIngredients = [];
    for (i=0;i<ingredients.length;i++){
      if (ingredients[i].inStock == true){
        myIngredients.push(ingredients[i]);
      }
    }
    res.render('home',{'ingredients':myIngredients});
  });
}

//adding an ingredient
routes.addIngredient = function(req, res) {
  var newIngredient = new Ingredients({name: req.body.name, price: req.body.price, inStock:true});
  newIngredient.save(function(err){
    Ingredients.find(function(err, ingredients){
      res.status(200).send(newIngredient);
      return;
    })
  })
};

//ingredient is out of stock
routes.outIngredient = function(req, res) {
  Ingredients.findOne({_id: req.body.id}, function(err,data){
    if(err){console.log(err)};
    data.inStock = false;
    data.disabled = 'disabled';
    data.save();
  });
  return;
};

//edit an ingredient
routes.editIngredient = function(req,res){
  Ingredients.findOne({_id: req.body.id}, function(err,data){
    if(err){console.log(err)};
    data.name = req.body.name;
    data.price = req.body.price;
    data.save();
  });
  return;
}

module.exports = routes;
