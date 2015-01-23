//Reads contents of directory and filters results by file extension
module.exports = function (dirName, fileExt, callback) {
	var filteredArray = [];
	var fs = require('fs');
	var path = require('path');

	fs.readdir(dirName, function(err, fileArray) {
		if (err) {
			return callback(err);
		};
		for (var i=0; i < fileArray.length; i++) {
			var fileName = fileArray[i];
			if (path.extname(fileArray[i]) === '.'.concat(process.argv[3])) {
				filteredArray.push(fileName);
			};
		};
	callback(null, filteredArray);
	});
};


