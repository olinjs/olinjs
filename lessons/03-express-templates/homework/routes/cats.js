var express = require('express');
var router = express.Router();
var db = require('../fakeDatabase.js');

router.post('/new', function(req, res) {
	db.add(req.body);
	res.json(req.body);
});
router.get('/', function(req, res) {
	res.json(db.getAll());
});
router.post('/bycolor', function(req, res) {
	var color = req.body.color;
	if (color != undefined) {

	} else {
		res.json({error: "Undefined color"});
	}
});
router.post('/killoldest', function(req, res) {
	var forensics = db.killOldestCat();
	if (forensics != undefined) {
		res.json({name: forensics[0], age: forensics[1]});
	} else {
		res.json({error: "No more cats to kill"});
	}
});

module.exports = router;