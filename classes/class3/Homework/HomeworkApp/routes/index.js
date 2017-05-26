var home = function(req, res) {
	res.render("home", {
		"classes": [
			"Olin.js",
			"other class 1",
			"other class 2",
			"other class 3"
		]
	});
};

var deleteCat = function(req, res) {
	res.render("home", {
		"classes": [
			"Olin.js",
			"other class 1",
			"other class 2",
			"other class 3"
		]
	});
};

var newCat = function(req, res) {
	res.render("home", {
		"classes": [
			"Olin.js",
			"other class 1",
			"other class 2",
			"other class 3"
		]
	});
};

var colorCat = function(req, res) {
	res.render("home", {
		"classes": [
			"Olin.js",
			"other class 1",
			"other class 2",
			"other class 3"
		]
	});
};

var listCats = function(req, res) {
	res.render("home", {
		"classes": [
			"Olin.js",
			"other class 1",
			"other class 2",
			"other class 3"
		]
	});
};

module.exports.home = home;
module.exports.deleteCat = deleteCat;
module.exports.newCat = newCat;
module.exports.colorCat = colorCat;
module.exports.list = listCats;