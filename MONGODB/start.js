var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function (callback) {
	var kitty = mongoose.Schema({
		name: String
	});

	kitty.methods.speak = function (){
		console.log(this.name
			? 'Meow name is' + this.name
			: 'I do not have a name'); 

	}

	var Kitten = mongoose.model('Kitten', kitty);

	var s = new Kitten({name: 'S'});
	console.log(s.name);

	var fluffy = new Kitten({name: 'fluffy'});
	fluffy.speak();
});