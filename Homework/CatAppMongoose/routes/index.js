var express = require('express');
var router = express.Router();

var home = function(req, res){
  res.render('home');
};

module.exports.home = home;
