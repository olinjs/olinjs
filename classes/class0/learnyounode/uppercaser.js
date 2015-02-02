var http = require('http');
var map = require('learnyounode/node_modules/through2-map');
var port = process.argv[2];

var server = http.createServer(function callback (request, response) {
	if (request.method != 'POST') {
		return response.end('I require a POST request\n');
	}

	request.pipe(map(function (chunk) {
		return chunk.toString().toUpperCase();
	})).pipe(response);
});

server.listen(port);

// Official Solution

// var http = require('http')
// var map = require('through2-map')

// var server = http.createServer(function (req, res) {
//   if (req.method != 'POST')
//     return res.end('send me a POST\n')

//   req.pipe(map(function (chunk) {
//     return chunk.toString().toUpperCase()
//   })).pipe(res)
// })

// server.listen(Number(process.argv[2]))
