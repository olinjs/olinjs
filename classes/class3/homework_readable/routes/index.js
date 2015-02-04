var mongoose = require('mongoose');
var names = require('./names');
var colors = require('./colors');

var cat = mongoose.Schema({
	cat_name: String,
	fur: String,
	age: Number
})

var Cat = mongoose.model('Cat', cat);

var make_cat = function(req,res){
	var new_cat = new Cat;
	new_cat.age = Math.round(Math.random()*20);
	new_cat.cat_name = names.choose();
	new_cat.fur = colors.choose();
	new_cat.save();
	res.render('add', {cat:new_cat});
}

var list_cats = function(req,res){
	Cat.find().sort('-age').exec(function(err,cats){
		if(err){
			console.log(err);
		}

		else{
			console.log(cats);
			res.render('list',{catlist:cats});
		}
	});
}

var by_color = function(req,res,des_color){
	Cat.find({fur:des_color}).sort().exec(function(err,cats){
		if(err){
			console.log(err);
		}

		else{
			res.render('list',{catlist:cats});
		}
	});
}

var remove_cat = function(req,res){
	Cat.find().sort('-age').exec(function(err,cats){
		if(err){
			console.log(err);
		}

		else{
			console.log(cats);
			var eldest = cats[0];
			Cat.remove({_id:eldest._id},function(){
				console.log(cats. length)
			});

			res.render('remove', {cat:eldest})
		};
	});
}

module.exports.make_cat = make_cat;
module.exports.list_cats = list_cats;
module.exports.find_color = by_color;
module.exports.remove_cat = remove_cat;
