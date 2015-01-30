var catModel = require('../models/catmodels');


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

var names = ["Tubs", "Samantha", "Speckles", "Sherlock", "Mr. Biggs", "Ella", "Marbles", "Delilah", "Zippy", "Sal", "Madeline", "Delaney", "Giles", "Mr.Mistoffelees","Mittens"];
var colors = ["orange", "grey", "black", "white", "calico", "tabby", "silver", "tan", "gold", "blue", "purple", "red", "magenta", "yellow", "green", "lilac", "pink"];

function Cat() {
	this.age = randInt(0, 23);
	this.name = names[randInt(0,names.length)];
	this.color = [colors[randInt(0,colors.length)], colors[randInt(0,colors.length)], colors[randInt(0,colors.length)]];
}

var newCat = function(req,res) {
	var myCat = new Cat();
	var myDbCat = new catModel(myCat);
	myDbCat.save(function(err) {
		if (err) {
			console.log("Problem saving new cat", err);
		} else {
			res.render('newcat',{"newcat": myCat});
		}
	});
}

var sortCats = function(req, res) {
	catModel.find({})
		.sort({age:+1})
		.exec(function(err, sortedCats) {
			if (err) {
				console.log("Problem sorting cats", err);
			} else {
				res.render('cats', {"sortedCats": sortedCats});
			}
		});
}

var sortColor = function(req, res) {
	catModel.find({color: req.params.color})
		.sort({age:+1})
		.exec(function(err, colorCats) {
			if (err) {
				console.log("Problem sorting cats by color", err);
			} else {
				res.render('colorcats', {"colorSearch": req.params.color, "colorCats": colorCats});
			}
		});
}

var deleteCat = function(req, res) {
	catModel.find({})
		.sort({age:-1})
		.exec(function(err, allCats) {
			if (err) {
				console.log("Problem deleting cat", err);
			} else {
				res.render("deleteold",{"oldcat": allCats[0]})
				allCats[0].remove();
			}
		});
}

module.exports.newCat = newCat;
module.exports.sortCats = sortCats;
module.exports.sortColor = sortColor;
module.exports.deleteCat = deleteCat;