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

	it('should return 200 OK on GET /login', function(done) {
		request(app)
		.get('/login')
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

});