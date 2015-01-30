var express = require('express');

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');

var index = require('./routes/index');
var cats = require('./routes/cats')

var app = express();
var mongoURI = process.env.MONGOURI || "mongodb://localhost/cats";
mongoose.connect(mongoURI);

var PORT = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);
app.get('/cats', cats.list);
app.get('/cats/new', cats.create);
app.get('/cats/bycolor/*', cats.colorSort);
app.get('/cats/delete/old', cats.remove);

app.listen(PORT, function() {
	console.log('Application running on port: ', PORT);
});