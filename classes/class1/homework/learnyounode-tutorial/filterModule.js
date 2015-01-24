var fs = require('fs');
var path = require('path');

module.exports = function (dirname, extname, callback) {
	var fileList = fs.readdir(dirname, function (err, list) {
		if (err) {
			return callback(err);
		}
		else {
			files = [];
			list.forEach(function (file) {
				if (path.extname(file) == "." + extname) {
					files.push(file);
				};
			});
			return callback(null, files);
		}
	})
}


