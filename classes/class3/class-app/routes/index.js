module.exports.home = function(req, res) {
	res.render('home', 
		{ "classes": 
			[
			"Olin.js",
			"other class 1",
			"other class 2" 
			]
		});
};