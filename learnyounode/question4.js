var fs = require('fs');
var buf;

fs.readFile(process.argv[2], function (err, data) {
	if(err){
		throw err;
	}
	buf = data;

	processFile();
});

function processFile() {
	var str = buf.toString();
	var arr = str.split('\n');
	console.log(arr.length - 1);
}

