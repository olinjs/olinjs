var fs = require('fs')
var file = process.argv[2]

function num_lines (err, contents) {
	console.log(contents.toString().split('\n').length - 1)
}

fs.readFile(file, num_lines)