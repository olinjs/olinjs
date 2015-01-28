function repeat( operation, num) {
	if (num <= 0) {
		return;
	}

	operation();
	repeat(operation, num - 1);

};

module.exports = repeat;