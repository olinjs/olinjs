var fs = require('fs');
var path = require('path');

var filepath  = process.argv[2];
var filter = process.argv[3];

fs.readdir(filepath, function (error, filenames) {
	for (var i = 0; i < filenames.length; i++) 
		if (path.extname(filenames[i]).indexOf(filter) > -1)
			console.log(filenames[i]);
});
