var total=0;
input = process.argv;
for (var i =2; i <= input.length-1; i++){
	total += Number(input[i]);
}
console.log(total);