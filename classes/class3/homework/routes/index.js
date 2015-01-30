var mongoose = require('mongoose');

var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
mongoose.connect(mongoURI);

var catSchema = mongoose.Schema({
	name: String,
	age: Number,
	colors: [String]
});

var Cat = mongoose.model('Cat',catSchema);

var names = ['Bob','Jack','Sandy','Sasha','Brendan','Phillly','Jen','Flufferton','Oprah'];
var colopts = ['red','yellow','black','white','brown','orange','gray'];

var home = function(req, res){
	res.render("home", {"pages": [
	  'create a new cat',
	  'show all cats',
	  'show colored cats',
	  'delete old cat']
	});
};

var cats = function(req, res){
	Cat.find({}).sort({age: -1}).exec(function(err, allcats) {
		if (err) return console.error(err);
		res.render("catlist",{"head": 'Here are all your cat friends',"ac": allcats});
	});
};

var newcat = function(req, res){
	col1 = colopts[Math.floor(colopts.length*Math.random())];
	col2 = colopts[Math.floor(colopts.length*Math.random())];
	col3 = colopts[Math.floor(colopts.length*Math.random())];
	kit = new Cat({
		name: names[Math.floor(names.length*Math.random())],
		age: Math.floor(Math.random()*20),
		colors: [col1,col2,col3]
	});
	kit.save(function (err) {
		if (err) console.log('problem saving kit', err);
	});
	res.render("newcat", kit);
};

var bycolor = function(req, res){
	Cat.find({colors: req.params['color']}).sort({age: -1}).exec(function(err, allcats) {
		if (err) return console.error(err);
		res.render("catlist",{"head": 'Here are all your color-specific friends',"ac": allcats});
	});
};

var old = function(req, res){
	count = 0;
	Cat.find({}).sort({age: -1}).exec(function(err, allcats) {
		if (err) return console.error(err);
		res.render("oldcat",allcats[0]);
		console.log(allcats[0]['_id']);
		Cat.findOneAndRemove({_id: allcats[0]['_id']},null,function(err, data) {
			if(err) return console.error(err);
		});
	});
};

module.exports.home = home;
module.exports.cats = cats;
module.exports.newcat = newcat;
module.exports.bycolor = bycolor;
module.exports.old = old;



