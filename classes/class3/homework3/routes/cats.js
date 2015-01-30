var mongoose = require('mongoose');

//Define the properties of our cats
var catSchema = mongoose.Schema({
	name: String, age: Number, colors: [String]
});
var Cat = mongoose.model('Cat', catSchema);

//These are the possible names
var names = ["Whiskers", "Skittles", "Spots", +
"Tinky", "Sophie", "Agatha", "Dorothy", +
"Taz", "Oreo", "Muffin"];

//These are the possible colors
var colors = ["black", "white", "tabby", "orange", "brown", "golden"];

var catList = function(req, res) {
	Cat.find({}, function(err, catList) {
		if (err) {
			console.error("Couldn't find cat list: ", err);
		}
		res.render('cats', {'cats': catList});
	});
};

var addCat = function(req, res) {
	//Choose a random name from the possible names
	var catName = names[Math.floor(Math.random()*names.length)];

	//Choose a random color from the possible colors
	var catColor = colors[Math.floor(Math.random()*colors.length)];
	
	//Chooses a 2nd random color from the possible colors
	var catColor2 = colors[Math.floor(Math.random()*colors.length)];


	//Create a new cat
	var newCat = new Cat({name: catName, age: Math.floor(Math.random() * 30 + 1) , colors: [catColor, catColor2]});
	//Add new cat to database
	newCat.save(function (err) {
		//console.log("Saving");
		if (err) {
			console.error("Couldn't successfully save cat: ", err);
		};
		console.log(newCat.name + " has been added and he is " + newCat.age 
		+ " years old and is " + [catColor, catColor2]);
		res.render('newcat', {newCat: newCat});
	});
};

var removeCat = function(req, res) {
	Cat.find().sort({age: -1}).exec(function(err, catList) {
		if (err) {
			console.error("Couldn't find and sort cats by age:", err);
		};

		//Now that we know the oldest cat's age, remove it
		Cat.findOneAndRemove({age: catList[0].age}, function(err, oldestCat) {
			if (err) {
				console.error("Couldn't remove " + catList[0].name, err);
			};
			console.log("Removed cat " + oldestCat.name + ", who is " + oldestCat.age);
			res.render('deletecat', {oldestCat: oldestCat});
		});
	});

};

var sortedCats = function(req, res, next) {
	//Get desired color from url
	var catColor = req.params.color;


	//Find cats with catColor and sort by age in descending order
	Cat.find({colors: catColor}).sort({age: - 1}).exec(function(err, sorted) {
		if (err) return next(err);
		if (!sorted) return next("No cats found with that color!");
		res.render('bycolor', {color:catColor, sortedCats: sorted});
		});
};




module.exports.catList = catList;
module.exports.addCat = addCat;
module.exports.removeCat = removeCat;
module.exports.sortedCats = sortedCats;




