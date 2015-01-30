var Cat = require('./../models/catModel.js');


var cats = function(req, res){

	Cat.find(function(err, cats){
		if (err){
			console.log("can't find cats", err);
		}
		var catsArr = cats;

		res.render("cats", {catslist:catsArr});
	});	
}
module.exports.cats = cats


var catsNew = function(req, res){
	var namesArr = ['Nitya', 'Sarah', 'Mika', 'Cynthia', 
		'Zoher', 'Dennis', 'Jay', 'Greg', 'Jenny', 
		'Ellie', 'Fluffy', 'Devynn'];
	var colorsArr = ['blue', 'orange', 'gray', 
		'red', 'yellow', 'green', 'purple', 'pink'];

	var randName = namesArr[Math.floor(namesArr.length*Math.random())];
	var randCol1 = colorsArr[Math.floor(colorsArr.length*Math.random())];
	var randCol2 = colorsArr[Math.floor(colorsArr.length*Math.random())];
	if (randCol1 !==randCol2){
		var catCol = [randCol1, randCol2];
	}
	else{
		var catCol = [randCol1];
	}
	var randAge = Math.floor(20*Math.random())+1;//rand from 1-20

	var nCat = new Cat({name:randName, 
		age:randAge, 
		colors: catCol});

	nCat.save(function(err){
		if(err){
			console.log("problemo saving nCat", err);
		}
	});

	res.render("cats", {catslist:[nCat]});
}
module.exports.catsNew = catsNew


var deleteOldCat = function(req, res){
	Cat.find().sort({age: -1}).exec(function(err, cats){
		if(err){
			console.log("no cats", err);
		}
		var toDel = cats[0];
		Cat.findOneAndRemove({'name': toDel.name}, function(err, data){
			if(err){
				console.log("couldn't remove", err);
			}
			res.render("cats", {catslist:[]});
		});

	});
}
module.exports.deleteOldCat = deleteOldCat


var catsByColor = function(req, res){
	Cat.find({colors: req.params.color}).exec(function(err, cats){
		if(err){
			console.log("no this color cats", err);
		}
		var catsCol = cats
		res.render("cats", {catslist:catsCol});
	});
}

module.exports.catsByColor = catsByColor
