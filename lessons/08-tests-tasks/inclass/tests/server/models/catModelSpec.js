require('./../../../app'); // to connect to the database
var expect = require('chai').expect;
var Models = require('./../../../models/models');
var Twote = Models.Twote;

describe('Twote Model', function() {
  it('should create a new twote', function(done) {
    var twote = new Twote({
      name: 'Fluffy',
      colors: ['orange', 'white'],
      age: 11
    });
    cat.save(function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  // What else can you test?

  it('should remove a cat by name', function(done) {
    Cat.remove({ name: 'Fluffy' }, function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });
});
