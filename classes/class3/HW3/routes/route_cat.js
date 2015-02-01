var path = require('path');
var Cat = require(path.join(__dirname,'../catmodel/mongoosemodel'));

var names = ["Liam", "Emma", "Noah", "Olivia", "Puss", "Ethan", "Sophia", "Mason", "Ava", "Logan", "Isabella", "Lucas", "Mia", "Jacob", "Charlotte", "Aiden", "Emily", "Jackson", "Abigail", "Avery", "Benjamin", "Madison"];
var age = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
var color = ["orange", "black", "grey", "white", "brown", "red", "silver", "blue"]

function rand_int(min,max){
	return Math.floor(Math.random()*(max - min + 1))+min;
}

function chooserandom(list){
	var index = rand_int(0,list.length-1);
	return list[index];
}

// makes a list of colors
function listcolors() {
  var res = [];
  color.forEach(function(c) {
    if (rand_int(0,color.length-1) < 3) {
      res.push(c);
    }
  });
    if (res.length == 0) {
    res.push(chooserandom(color));
  }
  return res;
  };

//new cat adds a cat with a random age, a name, and colors
var newcat = function(req, res) {
	var makecat = new Cat({ 
		name: chooserandom(names),
		color: listcolors(),
		age: chooserandom(age)
		
	});
	makecat.save(function (err) {
		if (err){
			console.log('error creating cat',err);
		}
	    
	  });
	    res.render("makecat",{"makecat": makecat})
};

// Shows a sorted list of cats by age. 
// Displays their names, colors and age.
var findcat = function(req,res){
	Cat.find({})
	   .sort({age: "asc"})
  	   .exec(function(err, cats) {
    	  res.render('catfind',{'catfind':cats});
  	});
}

//Shows a sorted list of cats by age that 
//have a specific color
var bycolor = function(req,res){
	Cat.find({color:req.params.color}).sort({age: "asc"}).exec(function(err, cats) {
  	   res.render("sortbycolor",{"bycolor": cats, "color":req.params.color});
    });
}

//Deletes the record of the oldest cat
var removecat = function(req,res){
    Cat.findOneAndRemove({},{sort:{age:'desc'}}, function(err,deletecat){
	     	Cat.find({})
		   .sort({age:'desc'})
		   .exec(function (err, cats){
		       res.render('removecat', {deletecat: deletecat}); 
		   })
	})
};

module.exports.findcat = findcat;
module.exports.newcat = newcat;
module.exports.bycolor = bycolor;
module.exports.removecat = removecat;