//Write a program that uses a single asynchronous
//filesystem operation to read a file and print 
// the number of newlines it contains to the
// console (stdout), similar to running 
//cat file | wc -l.

//The full path to the file to read will be 
//provided as the first command-line argument.

var fs = require('fs');
var filePath = process.argv[2];


fs.readFile(filePath, doneReadingForLines);

function doneReadingForLines(err, fileContents){
	if (err) throw err;

	var strFileC = fileContents.toString().split('\n');
	var numLines = strFileC.length-1;
	console.log(numLines);
}



/*
//Neatly puts the second callback in its own function

var fs = require('fs')
var myNumber = undefined

function addOne(callback) {
  fs.readFile('number.txt', function doneReading(err, fileContents) {
    myNumber = parseInt(fileContents)
    myNumber++
    callback()
  })
}

function logMyNumber() {
  console.log(myNumber)
}

addOne(logMyNumber)
*/