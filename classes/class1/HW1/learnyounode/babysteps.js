var total = 0 

for (var i = 2; i < process.argv.length; i++) {
	total = total + Number(process.argv[i]); 
	// same as result += Number(process.argv[i])
}

console.log(total)