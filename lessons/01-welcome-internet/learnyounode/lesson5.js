var path = require('path') 
var fs = require('fs')

fs.readdir(process.argv[2], callback);

function callback (err, list) { 
	//console.log(list);
	for (var i = 0; i<list.length;i++) {
		//console.log(path.extname(list[i]).substring(1));
		//console.log(process.argv[3]);
		if (process.argv[3] == path.extname(list[i]).substring(1)) {
			console.log(list[i]);
		}
	}
} 