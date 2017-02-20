// Sample tests
describe("A test suite", function() {
	// Synchronous
	it('should use expect syntax', function() {
		expect(true).to.be.true;
	});

	// Async
	it('should work asynchronously', function(done) {
		setTimeout(function() {
			expect(true).to.be.true;
			done();
		}, 1000);
	});
});