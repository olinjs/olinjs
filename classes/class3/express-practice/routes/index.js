// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;


var home = function(req, res){
	res.render("home", {"classes": [
		"Olin.js",
		"other class 1",
		"other class 2",
		"other class 3"]
	})
};

module.exports.home = home;