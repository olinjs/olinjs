module.exports = function name(func, num){
	if(num <= 1){
		return func();
	}

	func();

	return name(func, num-1);
}