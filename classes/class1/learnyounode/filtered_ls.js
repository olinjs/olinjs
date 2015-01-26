var fs = require('fs');
var path = require('path');

module.exports = function(directory_name, filename_extension, callback) {

	filtered_ls = [];
	fs.readdir(directory_name, function (err, list) {
		if (err) {
			return callback(err)
		}

		for (i = 0; i < list.length; i++) {
			if (path.extname(list[i]) == '.' + filename_extension) {
				filtered_ls.push(list[i]);
			}
		}

		callback(null, filtered_ls);
	});

}