var http = require('http')
var fs = require('fs')
var map = require('through2-map')
// callback function is called for each connection received by the server
var server = http.createServer(function (req, res) {
	req.pipe(map(function (chunk) {
		return chunk.toString().toUpperCase()
	})).pipe(res)
})
// server must start listening on the port first;
server.listen(process.argv[2])