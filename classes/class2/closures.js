var multSum = function(x, y) {
	var mult = function() {
		return x*y
	}
	return mult() + x + y
}

console.log(multSum(5, 6)) // 5*6 + 5 + 6