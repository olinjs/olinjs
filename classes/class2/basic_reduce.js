module.exports = function countWords(inputWords) {
	return inputWords.reduce(function (current, next){
		if (next in current) {
			current[next] += 1;
		} else {
			current[next] = 1;
		}
		return current;
	}, {});
}