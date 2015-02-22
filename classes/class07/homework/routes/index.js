var path = require('path');
var mongoose = require('mongoose');

var routes = {};

routes.home = function(req, res) {
  var user = req.session.user;
  if (!user)
    return res.redirect('/login?redir=true');
  else
    return res.render('home', {'body': 'HOME'});
}

routes.success = function(req, res) {
  var user = req.session.user;
  res.render('home', {'body': 'SUCCESS'});
}

routes.login = function(req, res) {
  res.render('login', {redir: req.query.redir});
}

routes.logout = function(req, res) {
  req. session.user = null;
  res.redirect('/');
}

module.exports = routes;