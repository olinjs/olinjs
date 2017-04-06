var express = require('express');
var router = express.Router();
var Robot = require('../models/robotModel.js')

/* GET home page. */
router.get('/', function(req, res, next) {
	var rob = new Robot({name: 'bob'});
	rob.save(function(err){
		if (err) {
			console.log('error');
		}
	})
	res.send('ok');
});

router.get('/who', function(req, res, next) {
	var r = Robot.find({}).exec(function(err, users) {
		console.log(users);
	});
	res.send(r);
});

module.exports = router;
