var cats = require("../models/cat");

// Index
exports.index_ =  function (req, res) {
    res.render('home');
};

// New Cat
exports.new_ = function (req, res) {
    console.log("building new cat");
    var newCat = cats.newRandoCat();
    newCat.save(function (err) {
        if (err) {
            console.log("Problem saving Cat");
        }
        res.render("newCat", newCat);
    })
};

// List of Cats by Age - display name color and age
exports.cats = function (req, res) {
    console.log("cats list queried");
    cats.Cat.find()
        .sort({age: 1})
        .exec(function (err, cats_) {
            console.log(cats_);
            res.render("listCats", {cats: cats_});
    });
};

// Find list of Cats by Color
exports.bycolor = function (req, res) {
    cats.Cat.find({colors: req.params.color})
        .sort({age: 1})
        .exec(function (err, cats_) {
            console.log(cats_);
            res.render("listCats", {cats: cats_});
        });
};

var url = require('url');
exports.helper = function (req, res) {
    req.params.color = url.parse(req.url, true).query.color;
    console.log(req.params.color);
    exports.bycolor(req, res);
}

exports.delete_ = function (req, res) {
    cats.Cat.find()
        .sort({age: -1})
        .limit(1)
        .exec(function (err, cats) {
            console.log(cats[0]);
            if (!cats.length) {
                res.render("delete", {name: "non-existant cat"});
                return;
            }
            cats[0].remove(function (error) {
                res.render("delete", cats[0]);
            });
        });
}

