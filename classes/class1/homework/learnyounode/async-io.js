var fs = require('fs');

fs.readFile(process.argv[2], function (err, file) {
	var buff = file.toString();
	buff = buff.split('\n');
	console.log(buff.length-1);
})