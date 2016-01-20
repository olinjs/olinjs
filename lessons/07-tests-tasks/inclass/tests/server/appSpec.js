var request = require('supertest');
var app = require('./../../app.js');

describe("The app", function() {
  it('should return 200 OK on GET /', function(done) {
    request(app)
      .get('/')
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

  it('should respond with the correct html on GET /', function(done) {
    request(app)
      .get('/')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect('Content-Length', '515', done); // ...or this way, inline!
  });

  it('should return 200 OK on GET /cats', function(done) {
    request(app)
      .get('/cats')
      .expect(200, done);
  });

  it('should respond with the correct html on GET /cats', function(done) {
    request(app)
      .get('/cats')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect('Content-Length', '151', done);
  });

  // What other routes can you test?

  it('should return 404 on GET /notaroute', function(done) {
    request(app)
      .get('/notaroute')
      .expect(404, done);
  });
});
