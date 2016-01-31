var robot = require('../models/robotModel.js');
var express = require('express');

var router = express.Router();
var robotList;

router.get('/', function(req, res, next) {
	 robot.find({}, function(err, robots){
	  	console.log(robots);
	  	robotList = robots;
        res.render('index', { message: robotList });

  });

});




module.exports.router = router;