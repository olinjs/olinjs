// var home = function(req, res){
//   res.render("home", {"classes": [
//   "Olin.js",
//   "other class 1",
//   "other class 2",
//   "other class 3"]
// });
// };

// module.exports.home = home;

var catsNew = function(req, res){
	res.render("catsNew", {"name":["somethingrandom"], 
		"age":["randomage"], 
		"colors":["color1", "color2", "color3"] });
}

module.exports.catsNew = catsNew

var cats = function(req, res){
	res.render("cat")
}