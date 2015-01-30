var path = require('path');
var Cat = require(path.join(__dirname,'../models/catmodel'));

var namesList = ['Indycule','Ignatz','Hume','Dunka','Brockie','Julie','Opie','Chaucer','Lew','Spamela','Tumbleweed'];
var colorList = ['red','brown','green','starbuck','blue','pink','white','gray'];

var generateName = function () {
	return namesList[Math.floor(Math.random() * namesList.length)]
}

var generateRandomAge = function (){
	return Math.ceil(20*Math.random())
}

var generateListofColors = function (){
	var colorArray = [];

	for (var i = 0; i < (colorList.length)-2; i++){
		colorArray.push(colorList[Math.floor(Math.random() * colorList.length)])
	}

	return colorArray;
}

var catsNew = function(req,res){
	
	var catX = new Cat({
		name: generateName(), 
		age: generateRandomAge(), 
		colorlist: generateListofColors()
	});
	console.log(catX)
	catX.save(function (err) {
	  if (err) {
	    console.log("Problem saving bob", err);
	  }
	});

	res.render("newcat",{'cat':catX});
}

var catsList = function(req,res){
	
	Cat.find({})
	   .sort({age: 1})
  	   .exec(function(err, cats) {
    	  res.render('catlist',{'cats':cats});
  	});
}

var sortedWithColor = function(req,res){

	Cat.find({colorlist:req.params.color})
	   .sort({age: 1})
  	   .exec(function(err, cats) {
    	  res.render('catlistcolor',{'cats':cats, 'colorFilterMessage':req.params.color});
  	});
}

var deleteCat = function(req,res){
	Cat.findOneAndRemove({},{sort:{age:-1}}, function(err,cat){

		Cat.find({})
		   .sort({age:1})
		   .exec(function (err, cats){
		       res.render('deletecat',{newcats:cats, deadcat:cat});
		   })
	})
}

module.exports.catsNew = catsNew;
module.exports.catsList = catsList;
module.exports.deleteCat = deleteCat;
module.exports.sortedWithColor = sortedWithColor;