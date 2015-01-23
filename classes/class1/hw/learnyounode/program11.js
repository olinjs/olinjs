var http = require('http');
var fs = require('fs');
var port = process.argv[2];
var fileLoco = process.argv[3];

var server = http.createServer(function (request, responce){

	var readStream = fs.createReadStream(fileLoco);

	readStream.on('open', function () {
	    // This just pipes the read stream to the response object (which goes to the client)
	    readStream.pipe(responce);
	  });

	  // This catches any errors that happen while creating the readable stream (usually invalid names)
	  readStream.on('error', function(err) {
	    responce.end(err);
	  });
})

server.listen(port)
