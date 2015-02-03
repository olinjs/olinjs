var http = require('http')
var chars = ''

http.get(process.argv[2], callback)

function callback(response) {
	response.setEncoding('utf8')
	response.on('data', function (data) { chars += data })
	response.on('error', console.error)
	response.on('end', function () {
		console.log(chars.length)
		console.log(chars)
	})
}