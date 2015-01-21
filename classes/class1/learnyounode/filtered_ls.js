var fs = require('fs')
var path = process.argv[2]
var extension = process.argv[3]

function callback (err, list) {
	for (var i = 0; i < list.length; i++) {
		if (list[i].split('.')[1] == extension) { 
			console.log(list[i]) 
		}
	}
}

fs.readdir(path, callback)