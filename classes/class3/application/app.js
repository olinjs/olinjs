var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars'); 
var app = express();

//Routes
var index = require('./routes/index');

//Initialize the express app
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Formats the type of logs that you want
app.use(logger('dev'));
//Parses the body of a request and puts it into a json object
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//This is a safe way of doing the route "./public"
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);

app.get('/olin', function(req, res, next) {
	console.log("hello");
	next();
});

app.get('/olin', function(req, res) {
	res.send("hello again");
});

app.post('/deborah', function(req, res) {
	res.send("Yay!");
})

//Host app on port 3000
app.listen(3000);