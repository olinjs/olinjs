var fs = require('fs');
var path = require('path');

module.exports = function (dirName, extName, callback) {

	fs.readdir(dirName, function (err, contents) {

		if (err) {
			return callback(err, contents);
		}

		contents = contents.filter(function(f) {
			return path.extname(f) == '.'+extName
		});

		for (var i = 0; i < contents.length; i++) {
			console.log(contents[i]);
		}

/*
		for (var i = 0; i < contents.length; i++) {
			if (path.extname(contents[i]) == "."+extName) {
				console.log(contents[i]);
			}
		}
*/

		callback(null, contents);
		return contents;

	});
};
