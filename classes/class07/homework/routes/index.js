var path = require('path');
var mongoose = require('mongoose');

var routes = {};

routes.home = function(req, res) {
  var user = req.session.user;
  if (!user)
    console.log('Not user');
  else
    console.log('User', user);
  return res.render('home', {'body': 'home'});
}