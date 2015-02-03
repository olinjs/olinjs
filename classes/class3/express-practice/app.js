var express = require('express');
var index = require('./routes/index');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);

var userSchema = mongoose.Schema({
	name: 'merp',
	grade: 'fail'
});

var User = mongoose.model('User', userSchema);
var bob = new User({name: 'bob', grade: 'A'});
bob.save(function (err) {
  if (err) {
    console.log("Problem saving bob", err);
  }
});

app.listen(3000);