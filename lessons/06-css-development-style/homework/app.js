var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var indexRoute = require('./routes/index');
var app = express();
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var session = require('express-session');


mongoose.connect('mongodb://localhost/twotter');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(favicon(path.join(__dirname,'public','images','burger.png')));

app.use(session({ 
  secret: 'superS3CRE7',
  resave: false,
  saveUninitialized: false ,
  cookie: {}
}));

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!")
});

app.get('/home', indexRoute.home);
app.get('/home/:user', indexRoute.home);

app.post('/newTwote', indexRoute.newTwote);
app.post('/deleteTwote', indexRoute.deleteTwote);

app.get('/login',indexRoute.login);
app.post('/loginUser',indexRoute.loginUser);

app.listen(3000, function(err) {
	if (err) console.log(err)
});