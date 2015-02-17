var path = require('path');
var mongoose = require('mongoose');
var Twote = require('./../models/twoteModel.js');
var User = require('./../models/userModel.js');

var routes = {};

routes.home = function(req, res) {
  var user = req.session.user;
  Twote.find({}).populate('creator').exec(function(err, twotes) {
    twotes = twotes.map(function(twote) {
      twote.userName = twote.creator? twote.creator.name: 'test';
      return twote;
    });
    User.find({}, function(err, users) {
      res.render('home', {
        user: user? user.name : '',
        users: users,
        twotes: twotes.reverse()
      });
    });
  });
}

routes.login = function(req, res) {
  res.render('home', {'twotes': 'Login!'});
}

module.exports = routes;