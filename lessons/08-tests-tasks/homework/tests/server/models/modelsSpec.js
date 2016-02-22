require('./../../../app'); // to connect to the database
var expect = require('chai').expect;
var Models = require('./../../../models/models');
var Twote = Models.twoteModel;
var User = Models.userModel;

describe('User Model', function() {
  it('should create a new user', function(done) {
    var user = new User({
      name: "bob"
    });
    user.save(function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  it('should remove a user by name', function(done) {
    User.remove({ name: 'bob' }, function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });
});

describe('Twote Model', function() {
  it('should create a new twote', function(done) {
    var twote = new Twote({
      author: "root",
      text: "Hello World",
      time: 655712
    });
    twote.save(function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  it('should remove a twote by author', function(done) {
    Twote.remove({ author: 'root' }, function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });
});
