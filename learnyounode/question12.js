var map = require('through2-map');
var http = require('http');

var server = http.createServer(function (req, res){
	if (req.method !== 'POST'){
		return res.end('send me a POST');
	}

	req.pipe(map(function (data){
		return data.toString().toUpperCase();
	})).pipe(res);
})

server.listen(Number(process.argv[2]));