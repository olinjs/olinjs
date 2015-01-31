var mongoose = require("mongoose");

exports.Ingredient = mongoose.model("ingredient", mongoose.Schema({
      name: String
    , cost: Number
    , stock: Boolean
}));

exports.Order = mongoose.model("order". mongoose.Schema({
      name: String,
    , ingredients: [ String ]
    , cost: Number
}));


exports.newIngredient = function (name_, cost_, callback) {
    var new_ = new exports.Ingredient({
          name: name_
        , cost: cost_
        , stock: true
    });

    new_.save(function (err) {
        if (err) {
            console.log("Failed to save Ingredient");
        }

        callback(new_);
    });
};

exports.newOrder = function (name_, ingredients_, callback) {
    var ids = [];
    var cost_ = 0;
    ingredients_.forEach(function(element, index) {
        ids.push(element._id);
        cost_ += element.cost;
    });

    var new_ = new exports.Order({
          name: name_
        , ingredients: _ids
        , cost: cost_
    });

    new_.save(function (err) {
        if (err) {
            console.log("Failed to save Order");
        }

        callback(new_);
    });
};