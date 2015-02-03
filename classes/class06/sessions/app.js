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
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}));

app.get('/', function(req, res) {
	console.dir(req.cookies);
	console.dir(req.session);
	
	if (req.session.counter)
		req.session.counter++;
	else
		req.session.counter = 1;

	res.send('hello');
});

app.listen(3000);