module.exports = function(){
    var express = require('express');
    var router = express();
    var Cat = require('../models/cat_model.js')

    router.get('/', function(req,res,next) {
      Cat.find(function (err,cats){
        if (err) {
            console.log('Error displaying all cats!');
            res.status(404).send('Error displaying all cats!');
        } else {
            cats = cats.map(function (cat){
                return 'name: '+cat['name']+' age: '+cat['age']+' colors: '+cat['colors'];
            });
            res.render('home',{'cats': cats});
        }});
    });

    router.get('/new', function(req,res,next) {
        function getRandomInt() {
          var min_age = 1;
          var max_age = 100;
          return Math.floor(Math.random() * (max_age - min_age)) + min_age;
        }
        function getRandomName() {
          var names = ['evan','ben','sarah','josh','thomas','paul','allen','another evan'];
          return names[Math.floor(Math.random()*names.length)];
        }
        function getRandomColors() {
          var colors = ['blue','green','yellow','pink','purple','sunshine','cat-color'];
          var random_colors = [];
          for (var i=0; i < colors.length;i++){
              if (Math.random() < 0.5){
                random_colors.push(colors[i]);
              }
          }
          if (random_colors.length === 0) {
            random_colors = ['rainbowunicorn'];
          }
          return random_colors;
        }
        console.log(getRandomInt());
        console.log(getRandomName());
        console.log(getRandomColors());
        cat_info = {age: getRandomInt(),name:getRandomName(),colors:getRandomColors()};
        var new_cat = new Cat(cat_info);
        new_cat.save(function (err) {
            if (err){
                console.log('Error saving new cat!');
                res.status(404).send('Error saving new cat!');
            } else{
                res.render('success',{'cat_info':cat_info});
            }
        });
    });

    router.get('/bycolor/:color', function(req,res,ext) {
        search_color = req.params.color;
        Cat.find({}, function(err,cats){
            if (err) {
                console.log('Error finding colored cat!');
                res.status(404).send('Error finding colored cat!');
            } else {
                cats = cats.filter(function (cat) {
                    return cat.colors.indexOf(search_color) > -1
                });
                cats = cats.map(function (cat){
                    return 'name: '+cat['name']+' age: '+cat['age']+' colors: '+cat['colors'];
                });
                res.render('home',{'cats': cats});
        }});
    });
            
    router.get('/delete/old', function(req,res,next) {
      Cat.find({}).sort({age: -1}).exec(function(err,cats){
        if (err) {
            console.log('Error deleting old cat!');
            res.status(404).send('Error deleting old cat!');
        } else {
            to_remove = cats[0];
            cat_info = 'name: '+to_remove.name+' age: '+to_remove.age+' colors: '+to_remove.colors;
            Cat.findOneAndRemove({_id:to_remove._id}).exec(function(err,cats){
                if (err) {
                    console.log('Error deleting old cat!');
                    res.render('failure');
                } else{
                    res.render('delete',{'cat_info': cat_info});
                }
            });
        }
      });
    });

    return router;
}();
