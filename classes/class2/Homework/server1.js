//version with annonymous function

var http = require("http");  //requires http module and assigns it to varable http

http.createServer(function(request, response) {   //creating server that returns an object

	response.writeHead (200, {"Content-Type": "text/plain"});
	response.write ("Hello World");
	response.end();
}).listen(8888);  //port on which server is listening