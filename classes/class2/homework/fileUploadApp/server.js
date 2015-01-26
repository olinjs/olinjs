var http = require("http");
var url = require("url");

function start(route, handle){
	function onRequest(request, response){
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + ' received.'); //now requests for different urls can be handled by different parts of the code
		
		route(handle, pathname);

		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Hello World!!");
		response.end();
	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started");
}

exports.start = start;	