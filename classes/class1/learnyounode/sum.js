// prints the sum of numbers inputed as command line arguments
var numbers = process.argv.slice(2);

// javascript reduce:
// https://www.airpair.com/javascript/javascript-array-reduce
sum = numbers.reduce(function(total, num) {
	return Number(total) + Number(num);
});
console.log(sum);