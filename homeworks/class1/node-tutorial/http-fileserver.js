var http = require('http');
var fs = require('fs');

var filepath = process.argv[3];
var server = http.createServer(function(req, res) {
	res.writeHeader(200, { 'content-type': 'text/plain' });
	fs.createReadStream(filepath).pipe(res);
});

server.listen( +process.argv[2]);