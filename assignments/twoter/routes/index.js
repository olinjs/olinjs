var express = require('express');
var router = express.Router();

var Twote = require('../models/twoteModel.js')
var User = require('../models/userModel.js')

router.get('/login', function(req, res, next) {
  console.log('Login here!');
  res.render("login");
}) 


router.get('/auth', function(req, res, next) {
  var username = req.query.name; //query
  console.log('Username '+ username)

  User.find({name: username}, function(err, user) {
    console.log(user.length);

    if(user.length < 1) {
      console.log('Creating new user!')
      var newuser = new User({name: username, twotes: []});

      newuser.save(function(err) {
        if(err) console.log('Could not save');
        console.log('New user created ' + newuser.name);
        req.session.user = newuser;
        res.send(newuser.name)
        //res.redirect('/home');
      })


    } else {
      console.log('User already exists! ');
      req.session.user = user[0]
      res.send(username)
      //res.redirect('/home');
      //res.redirect('/');
    }

  })


})


router.get('/home', function(req, res, next){
  Twote.find({}).sort({datetime: -1}).exec(function(err, twotes) {
    if(typeof req.session.user==='undefined') {//| req.session.user == null | req.session.user == "") {
      console.log('No one should be logged in ' + req.session.user)
      res.render("homeLoggedOut", {alltwotes:twotes})
    } else {
      var currentuser = req.session.user.name
      console.log(currentuser + ' logged in!')
      res.render("home", {username: currentuser, alltwotes: twotes})
    }
  })
})



router.post('/newTwote', function(req, res, next) {
  var currentuser = req.session.user.name;
  var twotetext = req.body.text;
  var now = new Date();

  console.log('New twote at ' + now)
  console.log('New twote text: ' + twotetext)
  console.log('Adding twote for user ' + currentuser)

  var newtwote = new Twote({user: currentuser, datetime: now, text: twotetext})

  newtwote.save(function(err) {
    if(err) console.log('Could not save');
    console.log('New twote at ' + newtwote.datetime)
    console.log('New twote text: ' + newtwote.text)
    console.log('Adding twote for user ' + newtwote.user)
  })

  res.send(newtwote);

})

router.post('/deleteTwote', function(req, res, next) {
  twoteid = req.body.id
  twoteid = twoteid.substring(0, twoteid.length-13)
  Twote.findByIdAndRemove(twoteid, function(err, twote) {
    console.log('Deleting twote ' + twote._id)
    res.send(twote._id)
  })



})

router.get('/logOut', function(req, res, next) {
  var loggedOutUser = req.session.user.name;
  console.log('Logging out ' + loggedOutUser)
  delete req.session.user;
  res.send(loggedOutUser);
  //res.redirect('/home')
})


module.exports = router;