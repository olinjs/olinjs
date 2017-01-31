var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

var home = function(req, res){
   res.render("home", {"classes": [
     {name:"Olin.js", teacher:"Me"},
     {name:"other class 1", teacher:"A baboon"},
     {name:"other class 2", teacher:"A sentient rock"}]
   });
};

module.exports.home = home;
