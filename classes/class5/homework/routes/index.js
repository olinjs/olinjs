var Pantry = require('../models/pantry_model.js').pantry;
var Ingredient = require('../models/pantry_model.js').ingredient;

var order = function(req, res){
  var prices_and_stock = {ingredients_and_prices: {potato:1.67, bread:3.18, catsup:.99}, in_stock: {potato:true, bread:false,catsup:false}};
  res.render('order', prices_and_stock);
};

var order_submit = function(req, res){
    console.log(req.body); 
    res.send('success!');
};

var kitchen = function(req, res){
    res.render('kitchen');
};

var ingredients = function(req, res){
  Pantry.find({}).exec(function (err,pantry){
      if (err){
          console.log("Couldn't get pantry data!");
          res.status(404).send('Error getting pantry data!');
      } else{
          if (pantry.length > 0) {
              console.log(pantry[0]);
              res.render('ingredients',pantry[0]);
          } else{
              console.log('No pantry found!');
              res.render('ingredients');
          }
      }
  });
};

var edit_ingredients = function(req, res){
    var req_type = req.body.form_type;
    //slices from index 5 because form_submitted is ajax-{ingredient_name} (we slice off ajax-)
    var req_ingredient = req.body.form_submitted.slice(5);
    //validate input first and make sure user isn't renaming ingredient to an empty string
    var req_form_text = req.body.form_text;

    console.log('req ingredient');
    console.log(req_ingredient);
    console.log('req form text');
    console.log(req_form_text);
    
    function is_white_space(str, req_type){
        if (str === undefined){
            return true;
        }
        var new_str = str.replace(/\+/g,'');
        var trim_str = new_str.trim();
        return trim_str === req_type + '=';
    };

    function needs_form_text(req_type){
        if (req_type === 'edit_name' || req_type === 'edit_price'){
            return true
        }
        return false
    };

    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function is_valid_price(str){
        if (str.length !== 4){
            return false;
        }
        if (!isNumber(str[0]),!isNumber(str[2]),!isNumber(str[4])){
            return false;
        }
        if (str[2] != '.'){
            return false;
        }
        return true;
    };

    if (needs_form_text(req_type) && is_white_space(req_form_text, req_type)){
      error_msg = 'invalid input!'
      console.log(error_msg);
      var info = {success:false, error_message:error_msg};
      res.status(404).send(info);
    } else{
        if (req_type === 'edit_name'){
            var formatted_req_form_text = req_form_text.slice(10);
            console.log(formatted_req_form_text);
            console.log('formatted form text above!');
            Pantry.findOne({owner:'Jessica'}).exec(function(err,pantry){
                if (err){
                  error_msg = 'no pantry to edit!'
                  console.log(error_msg);
                  var info = {success:false, error_message:error_msg};
                  res.status(404).send(info);
                } 
                else{
                  var ingredient_list = pantry.ingredients;
                  for (var i = 0; i < ingredient_list.length; i++){
                      if (ingredient_list[i].name === req_ingredient){
                          console.log('list matched req ingredient');
                          console.log(formatted_req_form_text);
                          ingredient_list[i].name = formatted_req_form_text;
                      }
                  }
                  console.log(pantry);
                  pantry.save();
                  var info = {success:true, form_to_update:req.body.form_submitted};
                  res.send(info);
                }
            })
        }
        else if (req_type === 'edit_price'){
            var formatted_req_form_text = req_form_text.slice(11);
            console.log(req_type); 
            console.log(ingredient); 
            res.send('success!');
        }
        else if (req_type === 'out_of_stock'){
            console.log(req_type); 
            console.log(ingredient); 
            res.send('success!');
        }
    }
};

//this method gives us a way to initially stock and reset our kitchen with some items to test things out
var stock_kitchen = function(req,res){
    Pantry.find({}).remove().exec(function (err,pantry){
        if (err){
          console.log(pantry)
          console.log("Couldn't delete pantry data!");
          res.status(404).send('Error deleting pantry data!');
        } else {
            pantry_info = {owner:'Jessica',ingredients: [ 
                    new Ingredient({name:'tomato',stock:60,price:1.99}),
                    new Ingredient({name:'cheese',stock:50,price:1.49}),
                    new Ingredient({name:'lettuce',stock:50,price:1.39}),
                    new Ingredient({name:'onion',stock:50,price:1.29}),
                    new Ingredient({name:'catsup',stock:50,price:1.19}),
                    new Ingredient({name:'mustard',stock:50,price:1.59}),
                    new Ingredient({name:'mayo',stock:50,price:1.69})
                ]}
            var new_pantry = new Pantry(pantry_info);
            new_pantry.save(function (err) {
                if (err){
                    console.log('Error initializing pantry!');
                    res.status(404).send('Error initializing pantry!');
                } else {
                    res.render('ingredients');
                }
            });
        }
    });    
};

module.exports.order = order;
module.exports.order_submit = order_submit;
module.exports.kitchen = kitchen;
module.exports.stock_kitchen = stock_kitchen;
module.exports.ingredients = ingredients;
module.exports.edit_ingredients = edit_ingredients;
