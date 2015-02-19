var path = require('path');
var mongoose = require('mongoose');
var Twote = require('./../models/twoteModel.js');
var User = require('./../models/userModel.js');

var routes = {};

routes.test = function(req, res) {
  var user = req.session.user;
  res.render('home', {'body': 'test'});
}

routes.home = function(req, res) {
  var user = req.session.user;
  if (!user)
    return res.redirect('/login?redir=true');
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

routes.twote = function(req, res) {
  var user = req.session.user;
  if (!user)
    return res.redirect('/login?redir=true');

  var twote = new Twote({
    creator: user.id,
    content: new Date(),
    time: req.body.twottext
  });

  twote.save(function(err) {
    User.findById(user.id, function(err, user) {
      twote.layout = false;
      twote.creator = user.name;
      res.render('/twote', twote);
    });
  });
}

routes.listTwotes = function(req, res) {
  var user = req.session.user;
  if (!user)
    return res.redirect('/login?redir=true');
  if (req.params.user) {
    User.findOne({name: req.params.user}, function(err, user) {
      twotes(user, res);
    });
  }
  else
    twotes(user, res);
}

module.exports = routes;