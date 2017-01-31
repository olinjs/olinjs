var express = require('express');
var db = require('../fakeDatabase');
var Cat = require('../models/catModel.js');
var router = express.Router();

//http://stackoverflow.com/questions/11935175/sampling-a-random-subset-from-an-array
function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

var newCat = function(req, res){
	var nameList = ["Sam","Mac-I","Sophia","Felix","Allison"];
	var colorList = ["Black", "Orange", "Brown", "White","Gray", "Silver", "Cream"];
	var name = nameList[Math.floor(Math.random()*nameList.length)];
	var age = Math.floor((Math.random() * 20) + 1);
	var colors = getRandomSubarray(colorList,Math.floor(Math.random()*4)+1)
	var cat = Cat({"name":name, "age":age, "colors": colors})
	cat.save(function (err, catm) {
	  if (err) return console.error(err)
	});
	console.log(cat.name)
	res.render("cat", {"action":"Added Cat!","cat": cat});
};

var listCats = function(req, res){
	var cats = db.getAll();
	Cat.find().sort('age').exec(function (err, cats) {
	  if (err) return console.error(err);
	  res.render("cats", {"cats": cats});
	})
};

var byColor = function(req, res) {
	var cats = Cat.find({colors: req.params.color}).sort('age').exec( function(err, cats) {
		res.render("cats", {"cats": cats});
	})

}

var byNameAndColor = function(req, res) {
	var cats = Cat.find({colors: req.params.color, name:req.params.name}).sort('age').exec( function(err, cats) {
		res.render("cats", {"cats": cats});
	})
}

var byNameOrColor = function(req, res) {
	var cats = Cat.find({$or: [{colors: req.params.color}, {name:req.params.name}]})
	.sort('age').exec( function(err, cats) {
		res.render("cats", {"cats": cats});
	})
}

var deleteOld = function(req, res) {
	Cat.findOneAndRemove().sort('-age').exec(function (err, cat) {
		if (err) {console.log(err)}
		res.render("cat", {"action": "Deleted Oldest Cat!","cat": cat});
	});
}

module.exports.newCat = newCat;
module.exports.listCats= listCats;
module.exports.byColor= byColor;
module.exports.byNameAndColor= byNameAndColor;
module.exports.byNameOrColor= byNameOrColor;
module.exports.deleteOld= deleteOld;