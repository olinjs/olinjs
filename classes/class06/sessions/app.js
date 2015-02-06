var express = require('express');
var session = require('express-session');
var path = require('path');

var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}));

app.get('/', function(req, res) {
	console.dir(req.cookies);
	console.dir(req.session);
	var message;
	if (req.session.counter) {
		req.session.counter++;
		message = "Hello again! Thanks for visiting " + req.session.counter + " times";
	} else {
		message = "Hello, thanks for visiting this site!";
		req.session.counter = 1;
	}
	res.send(message);

});

app.listen(3000);
