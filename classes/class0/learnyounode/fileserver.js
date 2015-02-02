var fs = require('fs');
var http = require('http');
var port = process.argv[2];
var location = process.argv[3];

var server = http.createServer(function callback (request, response) {
	fs.createReadStream(location).pipe(response);
});

server.listen(port);

// Official Solution

// var http = require('http')
// var fs = require('fs')

// var server = http.createServer(function (req, res) {
//   res.writeHead(200, { 'content-type': 'text/plain' })

//   fs.createReadStream(process.argv[3]).pipe(res)
// })

// server.listen(Number(process.argv[2]))
