var exphbs = require('express-handlebars');
var express = require('express');
var index = require('./routes/index');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//different routing paths
app.get('/cats/newtoy', index.createToy)
app.get('/cats/new', index.createCat);
app.get('/cats', index.listCats);
app.get('/cats/delete/old', index.deleteCat);
app.get('/cats/bycolor/:color', index.sortCats);
app.get('/old', index.gteCat);
app.listen(3000);
