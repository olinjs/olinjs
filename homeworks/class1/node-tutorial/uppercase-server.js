var http = require('http');
var fs = require('fs');
var map = require('through2-map');

var filepath = process.argv[3];
var server = http.createServer(function(req, res) {
	if (req.method == 'POST') {
		res.writeHeader(200, {'content-type': 'text/plain'});
		
		req.pipe(map(function(chunk) {
			return chunk.toString().toUpperCase();
		})).pipe(res);
	}
});

server.listen( +process.argv[2]);