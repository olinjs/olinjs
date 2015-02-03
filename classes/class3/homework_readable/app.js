var express = require('express');
var path = require('path');
var index = require('./routes/index');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var mongo = require('mongodb');

var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
mongoose.connect(mongoURI);

var PORT = process.env.PORT || 3000;

var app = express();


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req,res){
	res.send('This is a cat app! What are you doing here?');
});

app.get('/cats', index.list_cats);

app.get('/cats/new', index.make_cat);

app.get('/cats/delete/old', index.remove_cat);

app.get('/cats/bycolor/*', function(req,res){
	index.find_color(req,res,req.url.split(path.delimiter)[1]);
});



app.listen(PORT);
