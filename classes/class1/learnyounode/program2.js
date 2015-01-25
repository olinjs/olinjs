var total = 0;
for (var i = 2; i <= process.argv.length-1; i++) {
	total = Number(process.argv[i]) + total
}
console.log(total);