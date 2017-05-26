var mongoose = require('mongoose');

var names = ['Kurumi', 'Matcha', 'Peppermint', 'Botchan', 'Jessie', 'Charcoal', 'Alex'];
var colors = ['tan', 'black', 'white', 'orange', 'grey', 'chocolate'];

var cat_schema = mongoose.Schema({
	name: String,
	age: Number,
	color: String },
	{collection: 'cats'}
);

var Cat = mongoose.model('Cat', cat_schema);

var list = function(req, res) {
	Cat.find({}, function(err, list) { 
		if (err) console.log('Cannot List Cats', err);
		res.render('cats', {'cats': list})
	});
};

var create = function(req, res) {
	var cat = new Cat({name: names[Math.floor(Math.random()*names.length)],
		age: Math.floor(Math.random()*25),
		color: colors[Math.floor(Math.random()*colors.length)]});
	
	cat.save(function (err) {
		if (err) console.log('Problem Creating Kitten', err);
	})
	res.render('new', {'cat': cat});
};

var colorSort = function(req, res) {
	var address = req.url.split('/');
	var col = address[address.length-1];

	Cat.find({color: col}, function(err, list) { 
		if (err) console.log('Problem Sorting Cats', err);
		res.render('color', {'cats': list})
	});
};

var remove = function(req, res) {
	Cat.find({})
		.sort({age: -1})
		.limit(1)
		.exec(function(err, old) {
			Cat.remove({_id: old[0].id}, function(err) {
				if (err) return console.error(err);
				else {
					res.render('remove', {'cats': old});
				}
			})
		});
}

module.exports.list = list;
module.exports.create = create;
module.exports.colorSort = colorSort;
module.exports.remove = remove;