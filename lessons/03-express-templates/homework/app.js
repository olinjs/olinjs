var exphbs = require('express-handlebars');
var express = require('express');
var app = express();
var index = require('./routes/index');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);
app.get('/cats/new', index.new);
app.get('/cats', index.cats);
app.get('/cats/bycolor/:color', index.color);
app.get('/cats/delete/old', index.old);
app.listen(3000);

//req, res

//req.params.color