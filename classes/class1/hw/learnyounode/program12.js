var map = require('through2-map');
var http = require('http');
var port = Number(process.argv[2]);

var server = http.createServer(function (request, responce){

	if (request.method != 'POST'){
		return responce.end('Give me a POST\n')
	}
	request.pipe(map(function (data) {
	      return data.toString().toUpperCase();
	    })).pipe(responce)
})

server.listen(port)