var config = require('./oauth.js');
var mongoose = require('mongoose');
var path = require('path');
var express = require('express');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var home = require('./routes/home');
var login = require('./routes/login');
var profile = require('./routes/profile');
var auth = require('./routes/auth');

var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
var PORT = process.env.PORT || 3000;
mongoose.connect(mongoURI);

// serialize and deserialize
passport.serializeUser(function(user, done) {
done(null, user);
});
passport.deserializeUser(function(obj, done) {
done(null, obj);
});

// config
passport.use(new FacebookStrategy({
 clientID: config.facebook.clientID,
 clientSecret: config.facebook.clientSecret,
 callbackURL: config.facebook.callbackURL
},
function(accessToken, refreshToken, profile, done) {
 process.nextTick(function () {
   return done(null, profile);
 });
}
));

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
app.use(passport.initialize());
app.use(passport.session());

app.get('/', home.homeRender);
app.post('/homeTwit', home.postTwit);
app.post('/logout', home.logoutUser);
app.get('/login', login.loginRender);
app.post('/loginUser', login.loginPost)
app.get('/profile', profile.profileRender);
app.post('/deleteTwit', profile.deleteTwit);
app.post('/profilePost', profile.profilePost);

app.get('/auth/facebook',passport.authenticate('facebook'), auth.fbAuth);
app.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/login' }), auth.fbAuthCallback);

// app.get('/auth/facebook',
// passport.authenticate('facebook'),
// function(req, res){
// });
// app.get('/auth/facebook/callback',
// passport.authenticate('facebook', { failureRedirect: '/' }),
// function(req, res) {
//  res.redirect('/');
// });
// app.get('/auth/facebook', )

app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});

function ensureAuthenticated(req, res, next) {
if (req.isAuthenticated()) { return next(); }
res.redirect('/')
}