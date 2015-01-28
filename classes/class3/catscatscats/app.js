var express = require('express');
var path = require('path');
var logger = require('morgan'); // even though it's a rum, not a lager
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var index  = require('./routes/index');

var app = express();

app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);
app.get('/cats/new', index.catsNew);
app.get('/cats', index.cats);
app.get('/cats/bycolor/*', index.catsByColor);
app.get('/cats/bycolor', index.pickColor);
app.get('/cats/delete/old', index.catsDelete);

app.post('/olin', function(req, res) {
	res.send('hello olin');
});

app.listen(3000);
