var fs = require('fs')

fs.readFile(process.argv[2], 'utf8', callback)

function callback(err,data)
{
	if (err) throw err;
	var string = data
	string = string.split('\n')
	console.log(string. length -1)
}