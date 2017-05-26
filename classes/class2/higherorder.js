function repeat(operation, num) {
	for (var i = 0; i < num; i++) {
		operation();
	}
}

module.exports = repeat;
