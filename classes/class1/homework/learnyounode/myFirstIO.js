// cat file | wc -l
// ^ is a thing cat opens the file and makes 
// the output (contents of file) as the input
// for wc -l which will count the lines!

//Write a program that uses a single synchronous 
//filesystem operation to read a file and 
//print the number of newlines it contains 
//to the console (stdout), similar to running 
//cat file | wc -l.
//The full path to the file to read will be 
//provided as the first command-line argument.

var fs = require('fs'); //so we can perform filesystem operation
var filePath = process.argv[2];
var buf = fs.readFileSync(filePath);
var arrayOfEachLine = buf.toString().split('\n');
console.log(arrayOfEachLine.length-1); //num new lines
