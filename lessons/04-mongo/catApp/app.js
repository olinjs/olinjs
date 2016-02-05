var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var index = require('./routes/index');
var cats = require('./routes/cats');
var favicon = require('serve-favicon');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cats');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!")
});

app.get('/cats/new', cats.newCat);
app.get('/cats/', cats.listCats);
app.get('/cats/bycolor/:color', cats.byColor);
app.get('/cats/bynameandcolor/:name/:color', cats.byNameAndColor);
app.get('/cats/bynameorcolor/:name/:color', cats.byNameOrColor);
app.get('/cats/delete/old', cats.deleteOld);


app.listen(3000);