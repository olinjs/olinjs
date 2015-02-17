var path = require('path');
var mongoose = require('mongoose');
var Twote = require('./../models/twoteModel.js');
var User = require('./../models/userModel.js');

var routes = {};

routes.home = function(req, res) {
  var user = req.session.user;
  if (!user)
    return res.redirect('/login');

  res.render('home', {'body': 'this'});
}

routes.login = function(req, res) {
  res.render('login', {redir: req.query.redir});
}

module.exports = routes;