var path = require('path');
var mongoose = require('mongoose');
var Twote = require('./../models/twoteModel.js');
var User = require('./../models/userModel.js');

var routes = {};

routes.home = function(req, res) {
  res.render('home', {'body': 'Hello!'});
}

routes.login = function(req, res) {
  res.render('home', {'twotes': 'Login!'});
}

module.exports = routes;