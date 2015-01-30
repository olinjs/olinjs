var http = require('http');
var fs = require('fs');
var map = require('through2-map');

var server = http.createServer(function callback(req, res) {

	req.pipe(map(function (chunk) {
		return chunk.toString().toUpperCase();
	})).pipe(res)
}).listen(process.argv[2])