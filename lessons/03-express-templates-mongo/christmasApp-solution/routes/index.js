var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var d = new Date();
  var message;
  if(d.getMonth() === 11 && d.getDate() === 25){
    message = "YES";
  } else {
    message = "NO";
  }
  res.render('index', { message: message });
});

module.exports = router;
