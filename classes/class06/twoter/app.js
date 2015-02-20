var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var session = require('express-session');
var passport = require('passport');

var auth = require('./routes/authentication')



var index = require('./routes/index');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'},'empty'));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({ secret: 'some_secret',
					resave: true,
					saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',index.login);
app.get('/twoter',auth.ensureauth, index.home);
app.post('/twoter/add', index.addTwote);
app.post('/twoter/delete', index.deleteTwote);

app.get('/clear', index.clear);

app.post('/auth/local',auth.localauth,auth.postauth);
app.get('/auth/facebook',auth.faceauth,function(req,res){console.log('success')});
app.get('/auth/facebook/callback',auth.faceauth,auth.postauth);
app.get('/logout', auth.logout);

var PORT = process.env.PORT || 3000;
app.listen(PORT);
