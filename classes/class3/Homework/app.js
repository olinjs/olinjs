var express = require('express');
var app = express();
var catinfo = require('./model/catinfo.js');
var Cat = require('./model/catData').Cat;
var exphbs = require('express-handlebars');
var PORT = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.listen(PORT, function (){
	console.log('Running on port: ', PORT);
});

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
		res.render('catslist', {'cats':cats});
	});
});

app.get('/cats/bycolor/:color', function (req, res) {
	Cat.find({color: req.params.color}, function (err, cats){
		if (err) console.error(err);
		res.render('catslist', {'cats':cats});
	});
});

app.get('/cats/delete/old', function (req, res){
	Cat.findOne().sort('-age').exec(function (err, cat){
		if (err) console.error(err);
		res.render('deadcat', {'cats':cat});
		cat.remove();
	});
});

