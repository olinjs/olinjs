var http = require('http')
var fs = require('fs')
// callback function is called for each connection received by the server
var server = http.createServer(function (req, res) {
	// 'utf8 is not neccessary'
	var src = fs.createReadStream(process.argv[3], 'utf8');
	// response is also a Node stream! Can be used in piping/sending/receiving data
	src.pipe(res)
})
// server must start listening on the port first;
server.listen(process.argv[2])
