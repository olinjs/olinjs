var express = require('express');
var index = require('./routes/index');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session')

var passport = require('passport');
var config = require('./oauth.js');
var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('./models/userModel.js');
var fbAuth = require('./authentication.js');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: '123456789ASD'}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost/oauthtwotes');

passport.serializeUser(function(user, done) {
  console.log('serializeUser: ' + user._id);
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user){
    console.log(user);
      if(!err) done(null, user);
      else done(err, null);
    });
});

app.get('/', function(req, res) {
    res.redirect('/home')
})

app.get('/home', index);
app.get('/login', index, function(req, res) {
  res.redirect('/auth/facebook')
});

app.get('/auth', index);
// app.get('/logOut', index);

app.post('/newTwote', index);
app.post('/deleteTwote', index)


app.get('/account', ensureAuthenticated, function(req, res){
  User.findById(req.session.passport.user, function(err, dbuser) {
    if(err) {
      console.log(err);  // handle errors
    } else {
      console.log(dbuser.length);

      if(dbuser.length < 1) {
        console.log('Creating new user!')
        var newuser = new User({name: dbuser.name, twotes: []});

        newuser.save(function(err) {
          if(err) console.log('Could not save');
          console.log('New user created ' + newuser.name);
          res.redirect('/');
          //res.send(newuser.name)
          //res.redirect('/home');
        })
      } else {
        console.log('User already exists! ');
        res.redirect('/')
        //res.send(username)
        //res.redirect('/home');
        //res.redirect('/');
      }
    }
  });
});

app.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res){});
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/account');
  });

app.get('/logout', function(req, res){
  console.log('User logged out the right way')
  delete req.session.passport;
  req.logout();
  res.redirect('/');
});


// test authentication
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/facebook');
}


app.listen(3000);