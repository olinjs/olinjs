function func1() {
	var func2 = function() {
		return 2;
	};
	return func2;
}

console.log(func1()());