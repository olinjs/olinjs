var Pantry = require('../models/pantry_model.js').pantry;
var Ingredient = require('../models/pantry_model.js').ingredient;
var Order = require('../models/order_model.js');

//Helper functions for validating input data
function is_white_space(str){
    if (str === undefined){
        return true;
    }
    var new_str = str.replace(/\+/g,'');
    var trim_str = new_str.trim();
    return trim_str === '';
};

function needs_form_text(req_type){
    if (req_type === 'edit_name' || req_type === 'edit_price'){
        return true
    }
    return false
};

function isNumber(n) {
  if (parseFloat(n) < 0){
      return false;
  }
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function is_valid_price(str){
    var f = parseFloat(str);
    if(isNaN(f)){
        return false
    }
    if (str.slice(-3,-2) != '.'){
        return false;
    }
    return true;
};

function is_valid_stock(str){
    var num = parseInt(str);
    return (num % 1 === 0 && num >= 0);
}

function is_valid_add_data(req) {
    var new_ingredient_name = req.body.name;
    var price = req.body.price
    return (is_valid_price(price) && !is_white_space(new_ingredient_name))
}

var order = function(req, res){
  Pantry.findOne({owner:'Jessica'}).exec(function(err,pantry){
      if (err){
          console.log("Couldn't get pantry data!");
          res.status(404).send('Error getting pantry data!');
      } else{
          var obj_ingredients_and_prices = {};
          var obj_in_stock = {};
          var ingredients = pantry.ingredients;
          for (var i = 0; i < ingredients.length; i++) {
           console.log(ingredients[i]);
           obj_ingredients_and_prices[ingredients[i].name] = ingredients[i].price;
           console.log(ingredients[i].stock);
           if (ingredients[i].stock === 0){
               obj_in_stock[ingredients[i].name] = false;
           }else{
               obj_in_stock[ingredients[i].name] = true;
           }
          }
          prices_and_stock = {ingredients_and_prices:obj_ingredients_and_prices, in_stock:obj_in_stock};
          console.log(prices_and_stock)
          res.render('order', prices_and_stock);
      }
  });
};

var order_submit = function(req, res){
    var order_text = "Toppings requested: "+Object.keys(req.body).join(', ')
    var order = {ingredients:order_text};
    if (Object.keys(req.body).length < 1) {
        order.ingredients = 'No additional toppings!';
    }
    var new_order = new Order(order);
    new_order.save(function (err) {
        if (err){
            console.log('Error saving your order');
            res.status(404).send('Error saving your order');
        } else {
            res.send('success!')
        }
    });
};

var order_remove = function(req,res){
    Order.find({'_id':req.body.id_to_delete}).remove().exec(function (err,data){
      if (err) {res.status(404).send('Failed to delete order!');}
      else {
        console.log(data)
        res.send({id_deleted:req.body.id_to_delete});
      }
    });
}


var kitchen = function(req,res){
    Order.find({}).exec(function (err,orders){
      if (err) {res.status(404).send('Failed to search database!');}
      else {
        res.render('kitchen',{all_orders:orders});
      }
    });
};


var ingredients = function(req, res){
  Pantry.findOne({owner:'Jessica'}).exec(function(err,pantry){
      if (err){
          console.log("Couldn't get pantry data!");
          res.status(404).send('Error getting pantry data!');
      } else{
          res.render('ingredients',pantry);
      }
  });
};

var add_ingredient = function(req,res){
    if (!is_valid_add_data(req)) {
      error_msg = 'Invalid inputs!'
      console.log(error_msg);
      var info = {success:false, error_message:error_msg};
      res.send(info);
    } else{
      console.log("in add_ingredient!")
      Pantry.findOne({owner:'Jessica'}).exec(function(err,pantry){
          console.log("pantry length!")
          if (err || pantry.length < 1){
              console.log("Couldn't get pantry data!");
              res.status(404).send('Error getting pantry data!');
          } else{
              var already_exists = false;
              var ingredient_list = pantry.ingredients;
              for (var i = 0; i < ingredient_list.length; i++){
                  if (ingredient_list[i].name === req.body.name){
                      already_exists = true;
                  }
              }
              if (already_exists){
                  error_msg = 'Invalid inputs!'
                  console.log(error_msg);
                  var info = {success:false, error_message:error_msg};
                  res.send(info);
              } else {
                  var new_ing = new Ingredient({name:req.body.name,stock:60,price:req.body.price});
                  console.log(pantry);
                  pantry.ingredients.push(new_ing);
                  pantry.save(function (err){
                      if (err){
                          error_msg = 'could not save to pantry!'
                          console.log(error_msg);
                          var info = {success:false, error_message:error_msg};
                          res.status(404).send(info);
                      } else {
                          var info = {success:true, ingredient_name:req.body.name, stock:60, price:req.body.price};
                          res.send(info);
                      }
                  });
              }
          }
      });
    }
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
      if (parseFloat(n) < 0){
          return false;
      }
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function is_valid_price(str){
        var f = parseFloat(str);
        if (f < 0){
            return false;
        }
        if(isNaN(f)){
            console.log("not a num");
            return false;
        }
        if (str.slice(-3,-2) != '.'){
            return false;
        }
        return true;
    };

    if (needs_form_text(req_type) && is_white_space(req_form_text, req_type)){
      error_msg = 'invalid input!'
      console.log(error_msg);
      var info = {success:false, error_message:error_msg};
      res.status(404).send(info);
    } 
    else{

        if (req_type === 'edit_name'){
            console.log('in section 1');
            var formatted_req_form_text = req_form_text.slice(10);
            console.log(formatted_req_form_text);
            console.log('formatted form text above!');
            Pantry.findOne({owner:'Jessica'}).exec(function(err,pantry){
                if (err || pantry.length < 1){
                  error_msg = 'no pantry to edit!'
                  console.log(error_msg);
                  var info = {success:false, error_message:error_msg};
                  res.status(404).send(info);
                } 
                else{
                  var ingredient_list = pantry.ingredients;
                  var stock;
                  var price;
                  for (var i = 0; i < ingredient_list.length; i++){
                      if (ingredient_list[i].name === req_ingredient){
                          console.log('list matched req ingredient');
                          console.log(formatted_req_form_text);
                          ingredient_list[i].name = formatted_req_form_text;
                          stock = ingredient_list[i].stock;
                          price = ingredient_list[i].price;
                      }
                  }
                  console.log(pantry);
                  pantry.save(function (err){
                      if (err){
                          error_msg = 'could not save to pantry!'
                          console.log(error_msg);
                          var info = {success:false, error_message:error_msg};
                          res.status(404).send(info);
                      } else {
                      var info = {success:true, form_to_update:req.body.form_submitted, req:req.body.form_type, rstock:stock, rprice:price, ringredient:formatted_req_form_text};
                      res.send(info);
                      }
                  });
                }
            });
        }
        else if (req_type === 'edit_price'){
            console.log('in section 2');
            var formatted_req_form_text = req_form_text.slice(11);
            console.log(req_type); 
            console.log(req_ingredient); 
            console.log(formatted_req_form_text);
            Pantry.findOne({owner:'Jessica'}).exec(function(err,pantry){
                if (err || pantry.length < 1){
                  error_msg = 'no pantry to edit!'
                  console.log(error_msg);
                  var info = {success:false, error_message:error_msg};
                  res.status(404).send(info);
                } 
                else{
                    if (!is_valid_price(formatted_req_form_text)){
                      error_msg = 'Enter a valid price (ex 1.00)!'
                      console.log(error_msg);
                      var info = {success:false, error_message:error_msg};
                      res.send(info);
                    } 
                    else {
                      var ingredient_list = pantry.ingredients;
                      var stock;
                      var price;
                      for (var i = 0; i < ingredient_list.length; i++){
                          if (ingredient_list[i].name === req_ingredient){
                              console.log('list matched req ingredient');
                              console.log(formatted_req_form_text);
                              ingredient_list[i].price = formatted_req_form_text;
                              stock = ingredient_list[i].stock;
                              price = ingredient_list[i].price;
                          }
                      }
                      console.log(pantry);
                      pantry.save(function (err){
                          if (err) {
                          error_msg = 'could not save to pantry!'
                          console.log(error_msg);
                          var info = {success:false, error_message:error_msg};
                          res.status(404).send(info);
                          } else {
                          var info = {success:true, form_to_update:req.body.form_submitted, req:req.body.form_type, rstock:stock, rprice:price, ringredient:req_ingredient};
                          res.send(info);
                          }
                      });
                    }
                }
            });
        }
        else if (req_type === 'edit_stock'){
            var formatted_req_form_text = req_form_text.slice(11);
            Pantry.findOne({owner:'Jessica'}).exec(function(err,pantry){
                if (err || pantry.length < 1){
                  error_msg = 'no pantry to edit!'
                  console.log(error_msg);
                  var info = {success:false, error_message:error_msg};
                  res.status(404).send(info);
                } 
                else{
                    if (!is_valid_stock(formatted_req_form_text)){
                      error_msg = 'Enter a valid stock number (ex. 30)!'
                      console.log(error_msg);
                      var info = {success:false, error_message:error_msg};
                      res.send(info);
                    } 
                    else {
                      var ingredient_list = pantry.ingredients;
                      var stock;
                      var price;
                      for (var i = 0; i < ingredient_list.length; i++){
                          if (ingredient_list[i].name === req_ingredient){
                              ingredient_list[i].stock = parseInt(formatted_req_form_text);
                              stock = ingredient_list[i].stock;
                              price = ingredient_list[i].price;
                          }
                      }
                      console.log(pantry);
                      pantry.save(function (err){
                          if (err) {
                          error_msg = 'could not save to pantry!'
                          console.log(error_msg);
                          var info = {success:false, error_message:error_msg};
                          res.status(404).send(info);
                      } else {
                          var info = {success:true, form_to_update:req.body.form_submitted, req:req.body.form_type, rstock:stock, rprice:price, ringredient:req_ingredient};
                          res.send(info);
                      }});
                    }
                }
            });
        }
        else if (req_type === 'delete'){
            Pantry.findOne({owner:'Jessica'}).exec(function(err,pantry){
                if (err || pantry.length < 1){
                  error_msg = 'no pantry to edit!'
                  console.log(error_msg);
                  var info = {success:false, error_message:error_msg};
                  res.status(404).send(info);
                } 
                else{
                  var ingredient_list = pantry.ingredients;
                  for (var i = 0; i < ingredient_list.length; i++){
                      if (ingredient_list[i].name === req_ingredient){
                          ingredient_list.splice(i,1);
                      }
                  }
                  console.log(pantry);
                  pantry.save(function (err){
                      if (err) {
                      error_msg = 'could not save to pantry!'
                      console.log(error_msg);
                      var info = {success:false, error_message:error_msg};
                      res.status(404).send(info);
                  } else {
                      var info = {success:true, form_to_update:req.body.form_submitted, req:req.body.form_type, name:req_ingredient};
                      res.send(info);
                  }});
                }
            });
        }
    }
};

//this method gives us a way to reset our kitchen with some items to test things out
var stock_kitchen = function(req,res){
    Pantry.find({}).remove().exec(function (err,pantry){
        if (err){
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
module.exports.order_remove = order_remove;
module.exports.order_submit = order_submit;
module.exports.kitchen = kitchen;
module.exports.stock_kitchen = stock_kitchen;
module.exports.ingredients = ingredients;
module.exports.edit_ingredients = edit_ingredients;
module.exports.add_ingredient = add_ingredient;
