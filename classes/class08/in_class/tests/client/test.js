// Sample tests
describe("A test suite", function() {
	beforeEach(function() { });
	afterEach(function() { });

	// Syncronous
	it('should pass', function() { 
		expect(true).to.be.true; 
	});

	// Async
	it('should work asyncronously', function(done) {
		setTimeout(function() {
			expect(true).to.be.true;
			done();
		}, 1000);
	});
});