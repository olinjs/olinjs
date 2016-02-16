var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var indexRoute = require('./routes/index');
var authRoute = require('./routes/authRoutes');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var session = require('express-session');
var passport = require('passport');

var auth = require('./config/auth');
var passportConfig = require('./config/passportConfig');

var app = express();

mongoose.connect('mongodb://localhost/twotter');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(favicon(path.join(__dirname,'public','images','burger.png')));



app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: 'this is not a secret ;)',
  resave: false,
  saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport)

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!")
});


app.get('/', indexRoute.home);

app.post('/newTwote', indexRoute.newTwote);
app.post('/deleteTwote', indexRoute.deleteTwote);

app.get('/login',indexRoute.login);
app.post('/loginUser',indexRoute.loginUser);

app.get('/auth/logout', authRoute.logout);
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/' })
);

app.get('/auth/user', authRoute.ensureAuthenticated, authRoute.user)

app.listen(3000, function(err) {
	if (err) console.log(err)
});