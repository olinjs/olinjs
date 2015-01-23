var map = require('through2-map');
var http = require('http');

http.createServer(function (request,response) {
	request.pipe(map(function (chunk) {
		return chunk.toString().toUpperCase()
	})).pipe(response);
}).listen(process.argv[2]);