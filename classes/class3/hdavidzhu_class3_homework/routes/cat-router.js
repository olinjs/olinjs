var faker = require('faker');

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getRandomColors() {
	var colors = ['violet', 'coral', 'cerise', 'wheat', 'red', 'blue', 'green'];
	shuffle(colors);

	var chosenColorQueue = Math.ceil(Math.random() * 3);
	return colors.slice(0, chosenColorQueue);
}

// Models.
var Cat = require('../models/cat');
module.exports = {
	
	newCat: function (req, res) {
		var randomAge = Math.round(Math.random() * 14) + 1;
		var randomName = faker.Name.firstName();
		var randomColors = getRandomColors();

		var cat = new Cat({
			age: randomAge,
			name: randomName,
			colors: randomColors
		});

		cat.save(function (err) {
		  if (err) {
		    console.log("Problem saving bob", err);
		  }
		});

		res.send("Time to make a new cat!");
	},

	listCatByAge: function (req, res) {

		Cat.find()
			.sort({age: 1})
		  .exec(function(err, cats) {
				res.send(cats);
		  });
	},

	listCatByAgeColor: function (req, res) {
		var chosenColor = req.params.color;
		console.log(chosenColor);

		Cat.find({colors: chosenColor})
			.sort({age: 1})
		  .exec(function(err, cats) {
				res.send(cats);
		  });
	},

	moveCatToFarm: function (req, res) {

		Cat.find()
			.sort({age: -1})
		  .exec(function(err, cats) {
		  	cats[0].remove();
				res.send("Bye bye cat!");
		  });
	},
}

// function getRandomColor() {
//   var letters = '0123456789ABCDEF'.split('');
//   var color = '#';
//   for (var i = 0; i < 6; i++ ) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }

// function getRandomColors() {
// 	var colorNumber = Math.ceil(Math.random() * 3);
// 	var colors = [];
// 	for (var j = 0; j < colorNumber; j++ ) {
// 		colors.push(getRandomColor());
// 	}
// 	return colors;
// }