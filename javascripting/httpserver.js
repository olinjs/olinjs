var http = require('http');
var fs = require('fs');
var port = process.argv[2];
var fileLocatio = process.argv[3];
var server = http.createServer(function(request, res){
	var fp = fs.createReadStream(process.argv[3])
	fp.pipe(res);
	})

server.listen(port);
