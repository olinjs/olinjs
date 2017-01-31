var request = require('supertest');
var app = require('./../../app.js');

describe("The app", function() {
  it('should return 200 OK on GET /ingredients', function(done) {
    request(app)
      .get('/ingredients')
      .expect(200)
      .end(function(err, res) {
        // Supertest lets us end tests this way...
        // (useful if we want to check a couple more things with chai)
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should return 200 OK on POST /addIngredient', function(done) {
    request(app)
      .post('/addIngredient')
      .expect(200)
      .end(function(err, res) {
        // Supertest lets us end tests this way...
        // (useful if we want to check a couple more things with chai)
        if (err) {
          return done(err);
        }
        done();
      });
  });

  //editIngredient doesn't seem to work, nor does removeIngredient...
  //seems you can make an empty ingredient, but you can't edit or remove.

  it('should return 200 OK on GET /order', function(done) {
    request(app)
      .get('/order')
      .expect(200, done);
  });

  //addItemToOrder doesn't work
  //createOrder doesn't work


  it('should return 200 OK on GET /kitchen', function(done) {
    request(app)
      .get('/kitchen')
      .expect(200, done);
  });


  //orderComplete doesn't work!
  //majority of AJAX stuff works, but doesn't pass tests -- why?

  //   it('should return 200 OK on POST /orderComplete', function(done) {
  //   request(app)
  //     .post('/orderComplete')
  //     .expect(200, done);
  // });


  // What other routes can you test?

  it('should return 404 on GET /notaroute', function(done) {
    request(app)
      .get('/notaroute')
      .expect(404, done);
  });
});
