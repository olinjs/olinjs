var http = require('http')
var map = require('through2-map')
var fs = require('fs')

var server = http.createServer(function (req, res) {

	if(req.method != 'POST')
		return res.end('Not a POST Request')

	req.pipe(map(function(chunk) {
		return chunk.toString().toUpperCase()
	})).pipe(res)
	
})

server.listen(process.argv[2])