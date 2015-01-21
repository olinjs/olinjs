var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var filtered = numbers.filter(function evenNumbers (num) {
	return num % 2 === 0;
});

console.log(filtered);