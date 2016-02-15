var express = require('express');
var router = express.Router();

var Twote = require('../models/twoteModel.js')
var User = require('../models/userModel.js')




router.get('/home', function(req, res, next){
  Twote.find({}).sort({datetime: -1}).exec(function(err, twotes) {
    User.find({}).sort({name: -1}).exec(function(err, users) {
      if(typeof req.user==='undefined') {//| req.session.user == null | req.session.user == "") {
        console.log('No one should be logged in ' + req.user)
        res.render("homeLoggedOut", {alltwotes:twotes, allusers: users})
      } else {
        var currentuser = req.user.name
        var currentuserid = req.user._id
        console.log(currentuser + ' logged in!')
        res.render("home", {username: currentuser, userid: currentuserid, alltwotes: twotes, allusers: users})
      }
    })
  })
})




router.post('/newTwote', function(req, res, next) {
  var currentuser = req.user.name;
  var currentuserid = req.user._id;
  var twotetext = req.body.text;
  var now = new Date();

  console.log('New twote at ' + now)
  console.log('New twote text: ' + twotetext)
  console.log('Adding twote for user ' + currentuser)

  var newtwote = new Twote({
    user: currentuserid, 
    username: currentuser, 
    datetime: now, 
    text: twotetext
  })

  newtwote.save(function(err) {
    if(err) console.log('Could not save');
    console.log('New twote at ' + newtwote.datetime)
    console.log('New twote text: ' + newtwote.text)
    console.log('Adding twote for user ' + newtwote.user)
  })

  Twote.find({user: newtwote.user}).exec(function(err, twotes) {
    console.log('User ' + newtwote.username + ' has the following twotes: ' + twotes)
  })

  res.send(newtwote);

})

router.post('/deleteTwote', function(req, res, next) {
  twoteid = req.body.id
  twoteid = twoteid.substring(0, twoteid.length-7)
  Twote.findByIdAndRemove(twoteid, function(err, twote) {
    console.log('Deleting twote ' + twote._id)
    res.send([twote._id, twote.user, twote.username])
  })



})


module.exports = router;