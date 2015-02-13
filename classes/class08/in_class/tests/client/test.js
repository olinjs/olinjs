// Sample tests
describe("A test suite", function() {
	// Syncronous
	it('should use expect syntax', function() { 
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
