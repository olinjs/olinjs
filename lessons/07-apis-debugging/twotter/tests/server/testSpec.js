
// Setup our assertion library
var chai = require('chai')
var expect = chai.expect;
var sinon = require('sinon')

var index = require('../../routes/index');

describe("index", function() {

	// test for login page to render on GET request
	it('should return a rendered response when called', function() {
		var req, res, spy;

		req = res = {};
		spy = res.render = sinon.spy();

		index.loginPage(req, res);
		expect(spy.calledOnce).to.equal(true);
	});

	// Test cases for GET home route

	// No one logged in
	it('should not return a rendered response when called with no user signed in', function() {
		var req, res, spy;

		req = {session: {}};
		res = {};
		spy = res.render = sinon.spy();

		index.home(req, res);
		expect(spy.renderParams).to.equal(undefined);
	}) ;

	// user in db logged in
	it('should return an object when user signed in', function() {
		var req, res, spy;

		req = {session: {
			passport: {
				user: {
					username: 'Ariana Olson'
				}
			}
		}};

		res = {};
		spy = res.render = sinon.spy();

		index.home(req, res);
		expect(spy.renderParams).to.be.Object;
	});

	// user not in db logged in
	it('should return a rendered response with no data object when user not in db', function() {
		var req, res, spy;

		req = {session: {
			passport: {
				user: {
					username: 'Noslo Anaira'
				}
			}
		}};

		res = {};
		spy = res.render = sinon.spy();

		index.home(req, res);
		expect(spy.renderParams).to.be.Undefined;
	});

	// User logged in
	it('should return a message when not logged in', function() {
		var req, res, spy;

		req = {
			session: {},
			body: {
				text: "abc",
				time: 1487553763901
			}
		};

		res = {};

		expect(index.newTwote).to.be.String;
	});
});