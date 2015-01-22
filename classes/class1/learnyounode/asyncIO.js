// Uses a single **asynchronous** filesystem operation to read a file
// and print the number of newlines it contains to the console
var fs = require('fs');

if (process.argv.length > 2){
	filename = process.argv[2];
	fs.readFile(filename, 'utf8', function callback(err, str) {
		numNewline = str.split('\n').length - 1;
		console.log(numNewline);
	});
}
else {
	console.log('Provide input arguments')
}