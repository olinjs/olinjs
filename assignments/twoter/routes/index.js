var express = require('express');
var router = express.Router();

var Twote = require('../models/twoteModel.js')
var User = require('../models/userModel.js')

router.get('/login', function(req, res, next) {
  console.log('Login here!');
  res.render("login", {});
}) 

router.post('/auth', function(req, res, next) {
  var username = req.body.name; //query

  User.find({name: username}, function(err, user) {
    if(user.name) {
      console.log('User already exists! ');
    } else {
      var newuser = new User({name: username});
      console.log('New user created ' + newuser.name);

      newuser.save(function(err) {
        if(err) console.log('Could not save');
      })
    }
  })
  //res.redirect('../:username'); //check cat app to figure out how to do this
  res.redirect('..');
})

router.get('/', function(req, res, next){
  console.log('Twotes displayed here!');
  Twote.find({}, function(err, twotes) {
    console.log('Attempting to render');
    res.render("home", {alltwotes: twotes});
  })
})

router.post('/newTwote', function(req, res, next){
  //var user = req.body.user;
  //var text = req.body.text;
  console.log('New twote being created!');

})

module.exports = router;