var http = require('http');
var fs = require('fs');

var server = http.createServer(callback)
server.listen(process.argv[2])

function callback (request,response) { 
	var stream = fs.createReadStream(process.argv[3]);
	stream.pipe(response);
}