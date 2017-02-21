var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var auth = require('./auth');

module.exports = function(passport){
  passport.serializeUser(function(user,done){
    done(null,user);
  });

  passport.deserializeUser(function(user,done){
    done(null,user);
  });

  passport.use(new FacebookStrategy({
      clientID: auth.FACEBOOK_APP_ID,
      clientSecret: auth.FACEBOOK_APP_SECRET,
      callbackURL: auth.FACEBOOK_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
      //This is not what you want to do here.
      //Here you should search the connected DB if the user exists and load that in, or add it to db.
      done(null, profile);
    }
  ));
}
