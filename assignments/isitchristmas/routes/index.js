var express = require('express');
var router = express.Router();
//routes = {}

var xmasChecker = function(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth();

	var christmasYN = 'NO'
	if (dd === 25 && mm === 11){
		christmasYN = 'YES'
	}

	return christmasYN;
}


router.get('/', function(req, res){
	res.render('home', {isitchristmas: xmasChecker()});
});

router.get('/isItXmas', function(req, res) {
  	res.send(xmasChecker());
});

module.exports = router;
