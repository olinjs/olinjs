var fs = require('fs');
var path = require('path');
var input_path = process.argv[2];
var file_format = process.argv[3];

fs.readdir(input_path, function (err, list) {
	for (i = 0; i < list.length; i++) {
		if (path.extname(list[i]) == '.' + file_format) {
			console.log(list[i]);
		}
	}
});