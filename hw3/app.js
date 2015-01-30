var express = require('express');
var catinfo = require('./catinfo');
var app = express();
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    //
});

var catSchema = mongoose.Schema({
	name: String,
	age: Number,
	color : String
})

var Cat = mongoose.model('Cat', catSchema);

app.listen(3000);

app.get('/cats/new', function (req, res){
	var cat = new Cat({
		name: catinfo.name[Math.floor(Math.random()*catinfo.name.length)],
		age: Math.floor((Math.random() * 2000) + 1),
		color: catinfo.color[Math.floor(Math.random()*catinfo.color.length)]
	});

	cat.save(function (err, cat){
		if (err) return console.error(err);
	});

	res.send('Cat ' + cat.name + ' is created');
});

app.get('/cats', function (req, res){

	Cat.find().sort({age: -1})
	.exec(function (err, cats){
		if (err) console.error(err);
		res.render('home', {'cats':cats});
	});
});

app.get('/cats/bycolor/:color', function (req, res) {
	Cat.find({color: req.params.color}, function (err, cats){
		if (err) console.error(err);
		res.render('home', {'cats':cats});
	});
});

app.get('/cats/delete/old', function (req, res){
	Cat.findOne().sort('-age').exec(function (err, cat){
		if (err) console.error(err);
		cat.remove();
	});

	Cat.find().sort({age: -1})
	.exec(function (err, cats){
		if (err) console.error(err);
		res.render('home', {'cats':cats});
	});
});

