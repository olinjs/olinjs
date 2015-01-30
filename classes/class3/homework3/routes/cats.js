var mongoose = require('mongoose');

//Define the properties of our cats
var catSchema = mongoose.Schema({
	name: String, age: Number, colors: [String]
});
var Cat = mongoose.model('Cat', catSchema);

//These are the possible names
var names = ["Whiskers", "Skittles", "Spots", "Tinky", "Sophie", "Agatha", "Dorothy", "Taz", "Oreo", "Muffin"];

//These are the possible colors
var colors = ["black", "white", "tabby", "orange", "golden"];

var catList = function(req, res) {
	//List all of the cats currently stored in the database
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

	//Shuffle the cat array
	colors.sort(function() {
  		return .5 - Math.random();
	});

	//Choose a random color from the possible colors
	var catColor = colors[0];
	
	//Chooses a 2nd random color from the possible colors
	var catColor2 = colors[1];

	//Create a new cat
	var newCat = new Cat({name: catName, age: Math.floor(Math.random() * 30 + 1) , colors: [catColor, catColor2]});
	//Add new cat to database
	newCat.save(function (err) {
		//console.log("Saving");
		if (err) {
			console.error("Couldn't successfully save cat: ", err);
		};
		res.render('newcat', {newCat: newCat});
	});
};

var removeCat = function(req, res) {

	//Sort the cats in descending order by age
	Cat.find().sort({age: -1}).exec(function(err, catList) {
		if (err) {
			console.error("Couldn't find and sort cats by age:", err);
			};
		if (catList.length > 0) {
		//Now that we know the oldest cat's age, remove it
		Cat.findOneAndRemove({age: catList[0].age}, function(err, oldestCat) {
			if (err) {
				console.error("Couldn't remove " + catList[0].name, err);
			};
			res.render('deletecat', {oldestCat: oldestCat});
			});
		} else {
			//If the database is empty
			res.render('nocats');
		}
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




