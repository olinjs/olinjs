var schema = require('./models/schema');

exports.index_ = function (req, res) {
    res.render("home");
}

exports.ingredients_ = function (req, res) {
    schema.Ingredient
    .find()
    .sort({name : 1})
    .exec(function (err, array_) {
        res.render("listIngredient", {array: array_});
    });
}

exports.addIngredient = function (req, res) {
    schema.newIngredient(function(req.body.name, req.body.cost) {
        res.render(".");
    });
};

exports.orders_ = function (req, res) {
    console.log("");
}

exports.addOrder = function (req, res) {

};

exports.kitchen_ = function (req, res) {
    console.log("");
}
