var mongoose = require('mongoose');
var catSchema = mongoose.Schema({
	name: String,
	age: Number,
	colors: Array
});

var Cat = mongoose.model('Cat', catSchema);

var home = function(req, res){
	Cat.find().sort({age: -1}).exec(function(err, cats){
		res.render("home", {"cats": cats});
		console.log(cats);
	})
	
};

module.exports.home = home;

var newCat = function(req, res){
	var cs = ['brown','black','orange','white'];
	var consonants = ['c','a','t'];
	var i = Math.floor(Math.random()*2);
	var j = Math.floor(Math.random()*2);
	var k = Math.floor(Math.random()*2);
	var agei = Math.random()*20;
	var catInfo = {name: consonants[i]+consonants[j]+consonants[k], 
			age: agei, 
			colors: [cs[i],cs[j],cs[k+1]]
	};
	var cat = new Cat(catInfo);
	cat.save(function(err){
		if (err) {
			console.log("Problem saving cat", err);
		} 
		else {
			res.render("new", {"cat": catInfo})
		};
	});
};

module.exports.newCat = newCat;

var sortColor = function(req, res){
	var color = req.params.color;
	Cat.find({colors: color}).sort({age: -1}).exec(function(err, cats){
		console.log(cats);
		res.send(cats)
	}); 

};

module.exports.sortColor = sortColor;

var removeCat = function(req, res){
	Cat.find().sort({age: -1}).exec(function(err,cats){
		var id = cats[0]._id
		Cat.remove({_id:id},function(err,cats){
			res.sendStatus(cats);
		}); 
	});

};

module.exports.removeCat = removeCat;