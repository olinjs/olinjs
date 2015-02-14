var mongoose = require('mongoose');
var path = require('path');
var express = require('express');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var home = require('./routes/home');
var login = require('./routes/login');
var profile = require('./routes/profile');

var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
var PORT = process.env.PORT || 3000;
mongoose.connect(mongoURI);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.get('/', home.homeRender);
app.post('/homeTwit', home.postTwit);
app.get('/login', login.loginRender);
app.post('/loginUser', login.loginPost)
app.get('/profile', profile.profileRender);
app.post('/deleteTwit', profile.deleteTwit);
app.post('/profilePost', profile.profilePost);

app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});