/*
  Example Authentication Middleware.
  This is meant to serve as a simple example of how
  some middleware can be structured.
  If you're looking for something similar to use in
  your application, I recommend you check out Passport:
  http://passportjs.org/
*/

function LocalStrategy(options, verify){
  this._loggedInRedirect = options.loggedInRedirect;
  this._loggedOutRedirect = options.loggedOutRedirect;

  this._userField = options.userField || 'username';
  this._passwordField = options.passwordField || 'password';

  this._verify = verify;

  return this;
};

LocalStrategy.login(req, res, next){
  if (this._verify(
    req.body[this._userField], req.body[this._passwordField])
  ){
    req.session.user = req.body[this._userField];
    res.redirect(this._loggedInRedirect);
  } else {
    res.redirect(this._loggedOutRedirect);
  }
};

LocalStrategy.logout(req, res, next){
  req.session.user = null;

  res.redirect(this._loggedOutRedirect);
};

LocalStrategy.isAuth(req, res, next){
  if (req.session.user){
    return next();
  } else {
    res.redirect(this._loggedOutRedirect);
  }
};

module.exports = LocalStrategy;
