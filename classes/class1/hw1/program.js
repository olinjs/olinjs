//Exercise 2
/*var sum = 0;

for (i=2; i<process.argv.length; i++) {
	sum = sum + Number(process.argv[i]);
};

console.log(sum);*/

//Exercise 3
/*var fs = require('fs');

var fileContents = fs.readFileSync(process.argv[2]).toString();
var splitFileContents = fileContents.split('\n');

console.log(splitFileContents.length - 1);*/

//Exercise 4 
/*var fs = require('fs');

function numLines(callback) {
	fs.readFile(process.argv[2], function doneReading(err, fileContents) {
	var strFileContents = fileContents.toString();
	var splitFileContents = strFileContents.split('\n');

	numLines = splitFileContents.length - 1;
	callback();
	})
};

function logNumLines(callback) {
	console.log(numLines);
}

numLines(logNumLines);*/

//Exercise 5
var fs = require('fs');
var path = require('path');
var filteredArray = [];

function getFiles(callback) {
	fs.readdir(process.argv[2], function doneReading(err, fileArray) {
		for (var i=0; i < fileArray.length; i++) {
			var fileName = fileArray[i];
			if (path.extname(fileArray[i]) === '.'.concat(process.argv[3])) {
				filteredArray.push(fileName);
			};
		};
		callback();
	})
};

function logFiles() {
	for (var j=0; j < filteredArray.length; j++) {
		console.log(filteredArray[j]);
	}
	
};

getFiles(logFiles);





