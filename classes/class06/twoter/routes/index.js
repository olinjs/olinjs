var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('main');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;