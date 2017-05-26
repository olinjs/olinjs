var fs = require('fs');
var path = require('path');

module.exports = function (dir_path, file_extension, callback) {

	fs.readdir(dir_path, function (err,list){

		if (err) {
			return callback(err);
		}

		var filteredList = list.filter(function (file){
			return path.extname(file) === '.' + file_extension
		});

	callback(null, filteredList);

	})
}