//initializing packages
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require ('express-handlebars');

//requiring modules
var index = require('./routes/index');
var app = express();

//selecting port
var PORT = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.use(logger('dev'));  //call logger function and pass it 'dev'
app.use(bodyParser.json());  //parses body of request and puts into json object
app.use(bodyParser.urlencoded({ extended: false }));  //parses url things
app.use(cookieParser()); //parses cookies
app.use(express.static(path.join(__dirname, 'public')));  //static page


//initializing mongoose
var mongoose = require('mongoose');
var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
//var mongoURI = 'mongodb://user:password@ds053638.mongolab.com:53638/olinjs' || "mongodb://localhost/test";
mongoose.connect(mongoURI);
var db = mongoose.connection
//db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function (callback) {
	var catSchema = mongoose.Schema( {
		name: String, 
		age: Number, 
		colors: Array
	});

	var Cat = mongoose.model('Cat', catSchema);

	//routing

	app.get('/', index.home);

	app.get('/cats', function(req, res) {
		//TODO- sort by age and put in pretty handlebars
		Cat.find().sort("age").exec(function (err, cats) {
			if (err) {
				return console.error("There are no cats")
			} 
			if (!cats.length)
			{
				res.send('There are no cats.');
			}
			else {
				//res.send(cats);
				res.render ('listCats', {"cats": cats}); 
			}
		})
	});

	app.get('/cats/new', function(req, res) {
		//TODO- Put in pretty handlebars

		//generates random age between 0 and 10
		var genAge = (Math.random()*10).toFixed(0);
		var nameList = ['Frank', 'Sally', "Kevin", 'Fluffy', 'Midnight', 'Shadow', 'Tigger', 'Tiger', 'Boots'];
		var genName = nameList[Math.floor(Math.random() * nameList.length)];
		var colorList1 = ['yellow', 'orange', 'black', 'white', 'grey', 'brown', 'silver'];
		var colorList2=['spotted', 'striped', 'patchy', 'smokey'];
		var genColors = [colorList1[Math.floor(Math.random() * colorList1.length)], colorList2[Math.floor(Math.random() * colorList2.length)]];

		var newCat = new Cat ({name: genName, age: genAge, colors: genColors});
		newCat.save(function (err, newCat) {
			if (err) {
				return console.error('There was a problem creating your cat');
			}
			res.send(newCat.name + ' was created! Your new cat is ' + newCat.age + ' years old, and looks ' + newCat.colors + '.');
		});
	});

	app.get('/cats/bycolor/:color', function(req, res) {
		Cat.find().exec(function (err, cats) {
			var catsWithColor = [];
			if (err) {
				return console.error("err")
			}
			if (!cats.length)
			{
				res.send('There are no cats.');
			}
			else {
				for (var cat = 0; cat<cats.length;cat++) {
					for (var color = 0;color<2; color++) {
						if (cats[cat].colors[color] === req.param("color")) {
							catsWithColor.push(cats[cat]);
						}
					}
				}
				//res.send("The following cats are " + req.param("color") + ': ' +catsWithColor);
				res.render ('colorCat', {"cats": catsWithColor}); 
			}
		})
	});

	app.get('/cats/delete/old', function(req, res) {
		Cat.find().sort({"age": -1}).exec(function (err, cats) {
			var oldestCat = cats[0];
			if (err) {
				return console.error("err")
			}
			if (!cats.length)
			{
				res.send('There are no more cats.');
			}
			else {
				//res.send('The oldest cat, ' + oldestCat.name +', has been sent to a nice farm in the country.');
				res.render ('deleteCat');
				Cat.find(oldestCat).remove().exec();
			}
		})
	});
});

app.listen(PORT, function() {
	console.log("Application running on port:", PORT);
});