var Robot = require('../models/robotModel.js');

var home = function(req, res){
	res.send("working...");
	Robot.find({}, function(err, robots){
		res.render("robots", robots);
		if (err) {
			console.log(err);
		}
	});
};

module.exports.home = home;