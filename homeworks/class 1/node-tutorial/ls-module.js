var fs = require('fs');
var path = require('path');

module.exports = function (filepath, filter_ext, callback) {
	fs.readdir(filepath, function (error, filenames) {
		if (error) return callback(error);

		var filtered = filenames.filter(function (element) {
				return path.extname(element) === '.' + filter_ext; });

		callback(null, filtered);
	});
};


