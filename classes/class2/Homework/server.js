// //version without annonymous function

var http = require("http"); //requires http module and assigns it to varable http
var url = require("url");

function start(route, handle) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");

		request.setEncoding("utf8");

		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk '"+
			postDataChunk + "'.");
		});

		request.addListener("end", function() {
			route(handle, pathname, response, postData);
		});
	}

	http.createServer(onRequest).listen(8888);  //creating server that returns an object on port 8888
	console.log("Server has started.");
}

exports.start = start;