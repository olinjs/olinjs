var path = require('path');
var mongoose = require('mongoose');
var Twote = require('./../models/twoteModel.js');
var User = require('./../models/userModel.js');

var routes = {};

routes.test = function(req, res) {
  var user = req.session.user;
  res.render('home', {'body': 'DID IT WORK?'});
}

routes.home = function(req, res) {
  var user = req.session.user;
  if (!user)
    return res.redirect('/login');
  else
    return res.render('home', {'body': 'NOPE'});
}

routes.login = function(req, res) {
  res.render('login', {redir: req.query.redir});
}

routes.logout = function(req, res) {
  req.session.user = null;
  res.redirect('/');
}

routes.create = function(req, res) {
  User.findOne({name: req.body.username}, function(err, user) {
    if (!user) {
      var newUser = new User({name: req.body.username});
      newUser.save(function(err) {
        req.session.newUser = newUser;
        res.redirect('/');
      });
    } else {
      req.session.user = user;
      res.redirect('/');
    }
  });
}

module.exports = routes;