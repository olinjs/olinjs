var express = require('express');
var router = express.Router();

// Models
var Author = require('../schemas/author');
var Twote = require('../schemas/twote');

router.get('/', function(req, res, next) {
  res.render('main');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res) {

});

module.exports = router;