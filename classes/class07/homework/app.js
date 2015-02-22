var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var passport = require('passport');

var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.configure(function() {
  app.use(express.static(__dirname + '/../../public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('home');
});

app.post('/hello', function(req, res) {
  var text = req.body.text;

  res.send('I got this text: ' + text);
});

app.listen(3000);