var express = require('express');
var router = express.Router();
// var db = require('../fakeDatabase.js');
var Cat = require('../models/catModel.js');

router.post('/new', function(req, res) {
	var newCat = new Cat(req.body);
	newCat.save(function(err) {
		if (err) {
			console.log("Problem adding new cat", err);
		} else {
			res.json(req.body);
		}
	});
	// db.add(req.body);
	// res.json(req.body);
});
router.get('/', function(req, res) {
	Cat.find({}, function(err, cats) {
		res.json(cats);
		if (err) {
			console.log("Problem fetching cats", err);
		}
	});
	// res.json(db.getAll());
});
router.post('/bycolor', function(req, res) {
	var color = req.body.color;
	if (color) {
		Cat.find({colors: req.body.color}, function(err, cats) {
			res.json(cats);
			if (err) {
				console.log("Problem fetching cats of color", err);
			}
		});
	} else {
		res.json({error: "Undefined color"});
	}
	
	// var color = req.body.color;
	// if (color != undefined) {

	// } else {
	// 	res.json({error: "Undefined color"});
	// }
});
router.post('/killoldest', function(req, res) {
	Cat.find().sort({"age": -1}).limit(1).exec(function(err, cat) {
		if (err) {
			console.log(err);
		} else {
			if (cat.length > 0) {
				res.json({name: cat[0].name, age: cat[0].age});
				Cat.findByIdAndRemove(cat[0].id).exec();
			} else {
				res.json({error: "No more cats to kill"});
			}
		}
	});
	// var forensics = db.killOldestCat();
	// if (forensics != undefined) {
	// 	res.json({name: forensics[0], age: forensics[1]});
	// } else {
	// 	res.json({error: "No more cats to kill"});
	// }
});

module.exports = router;