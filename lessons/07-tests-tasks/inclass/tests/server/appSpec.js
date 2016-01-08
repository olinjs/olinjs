var request = require('supertest');
var app = require('./../../app.js');

describe("The app", function() {
  it('should return 200 OK on GET /', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect('Content-Length', '515')
      .end(function(err, res) {
        // Supertest lets us end tests this way...
        // (useful if we want to check a couple more things with chai)
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should return 200 OK on GET /cats', function(done) {
    request(app)
      .get('/cats')
      .expect(200)
      .expect('Content-Length', '257', done); // ...or this way, inline!
  });

  // What other routes can you test?

  it('should return 404 on GET /notaroute', function(done) {
    request(app)
      .get('/notaroute')
      .expect(404, done);
  });
});
