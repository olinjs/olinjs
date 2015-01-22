var http = require('http');
var fs = require('fs');

var server = http.createServer(function(request, response){
	fs.createReadStream(process.argv[3]).pipe(response)

})
server.listen(process.argv[2])