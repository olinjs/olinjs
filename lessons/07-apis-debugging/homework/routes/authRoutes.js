var express = require('express');
var router = express.Router();

module.exports = router;

var logoutGET = function(req, res) {
	req.logout();
    res.redirect('/');
}

var userGET = function(req, res) {
	res.send(req.user);
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
    res.send(401);
}

module.exports.logout = logoutGET;
module.exports.user = userGET;
module.exports.ensureAuthenticated = ensureAuthenticated;