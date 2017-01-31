var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

var home = function(req, res){
	var datetime = new Date();
	if (datetime.getMonth() === 11 && datetime.getDate() === 25) {
		res.render("home", {"christmasTime": "Yes"});
	} else {
		res.render("home", {"christmasTime": "No"});
	}
   
};

module.exports.home = home;
