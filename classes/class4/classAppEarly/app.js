var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var index = require('./routes/index');
var getCat = require('./routes/getCat');

var app = express();

//mongoose.connect("mongodb://localhost/test");

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
//use handlebars extension to render, evrythin main!
app.set('view engine', 'handlebars');
//set that view engine

app.use(logger('dev')); //logger function formats logs can customize
app.use(bodyParser.json()); //its going to parse 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//jump to any directory, static checks path of request
//inside public. so i can get test.txt navigate to localhost:3000/javascripts/text.txt

app.get('/', index.home);
app.get('/getCat', getCat.getCatGET);
app.post('/getCat', getCat.getCatGET);

app.get('/olin', function(req,res,next){
	console.log("hello");
	next();
});

app.get('/olin', function(req,res){
	res.send('hello olin');
});

app.listen(3000);

//mkdir myhw, cd myhw, git init, git remote -v, git push heroku master
//back out of hw app to class 3 to push to github