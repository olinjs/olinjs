var fs = require('fs');
var path = require('path');
var filteredArray = [];

//Reads contents of directory and filters results by file extension
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