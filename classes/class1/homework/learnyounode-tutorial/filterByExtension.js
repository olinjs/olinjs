var filterModule = require('./filterModule.js');
var dirname = process.argv[2];
var extname = process.argv[3];

filterModule (dirname, extname, function callback (err, list) {
	if (err) {
		console.log("ERROR")
	}

	list.forEach(function (file) {
		console.log(file);
	});
});