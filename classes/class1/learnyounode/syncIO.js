// Uses a single synchronous filesystem operation to read a file
// and print the number of newlines it contains to the console
var fs = require('fs');

if (process.argv.length > 2){
	fn = process.argv[2];
	buffer = fs.readFileSync(fn);
	str = buffer.toString();
	num_newline = str.split('\n').length - 1;
	console.log(num_newline);
}
else {
	console.log('Provide input arguments')
}