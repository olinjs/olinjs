var fs = require('fs');
var path = require('path');
var ext = '.' + process.argv[3];

fs.readdir(process.argv[2], function (err, files) {
	files.forEach(function(file){
		if (ext === path.extname(file)) {
			console.log(file);
		}
	});
});