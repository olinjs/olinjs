var config = require('./oauth.js')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;

var models = require('./models')

// serialize and deserialize
passport.serializeUser(function(user, done) {
 console.log('serializeUser: ' + user._id)
 done(null, user._id);
});
passport.deserializeUser(function(id, done) {
 models.Users.findById(id, function(err, user){
     console.log(user)
     if(err) {done(err, null);}
     else if(user){done(null,user);}
     else {
     	models.FacebookUsers.findById(id, function(err, fbuser){
     	console.log(fbuser)
     	if(err) {done(err, null);}
     	else if(fbuser){done(null,fbuser);}
     	else{
     		done(null,null);
     	}
		});
     }
 });
});

// config
passport.use(new LocalStrategy(
  function(username, password, done) {
  	console.log("localStrat",username,password)
    models.Users.findOne({ username: username }, function (err, user) {
      if (err) { done(err); }
      else if (!user) { 
      	var newuser = new models.Users(
      		{username:username,
      		password:password}
      	);
      	newuser.save(function(err) {
	      if(err) {
	        console.log(err);
	      } else {
	        console.log("saving user ...");
	        done(null, newuser);
	      };
	    });
      }
      else if (user && user.password != password) { done(null, false); }
      else{done(null, user);}
    });
  }
));

passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL
},
function(accessToken, refreshToken, profile, done) {
console.log("FacebookStrat")
models.FacebookUsers.findOne({ oauthID: profile.id }, function(err, user) {
  if(err) { console.log(err); }
  if (user != null) {
    done(null, user);
  } else {
  	console.log(profile)
    var user = new models.FacebookUsers({
      oauthID: profile.id,
      username: profile.displayName,
      created: Date.now()
    });
    user.save(function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("saving user ...");
        done(null, user);
      };
    });
  };
});
}
));

module.exports.faceauth = passport.authenticate('facebook',{ failureRedirect: '/' });
module.exports.localauth = passport.authenticate('local',{failureRedirect: '/' });

module.exports.postauth = function(req, res){
	res.redirect('/twoter');
}
module.exports.logout = function(req, res){
req.logout();
res.redirect('/');
}


// test authentication
module.exports.ensureauth = function (req, res, next) {
if (req.isAuthenticated()) { return next(); }
console.log('ensureauth failed');
res.redirect('/')
}