//Filippos helped me here - what a guy
var express = require('express');
var router = express.Router();

// /* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('home', {'link': [
		'/cats',
		'/cats/new',
		'/cats/delete/old',
		'/cats/bycolor/Pink',
		'/cats/bycolor/Orange',
		'/cats/bycolor/StripedGray'
		]
	})
});

module.exports.home = router;