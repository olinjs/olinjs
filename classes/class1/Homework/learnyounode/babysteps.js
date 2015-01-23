array = process.argv;
//console.log (array);
total = 0;

for (var i = array.length - 1; i >= 2; i--) {
	total += Number (array[i]);
	//console.log(total);
};
console.log(total);