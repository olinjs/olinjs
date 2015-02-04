var http = require("http");
var url = require("url");

function start(route, handle){
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		
		route(handle, pathname, response);
	}

	http.createServer(onRequest).listen(3000);	

	console.log("Server has started.");
}

exports.start = start;

// function say(word) {
// 	console.log(word);
// }

// function execute(someFunction, value) {
// 	someFunction(value);s
// }

// execute(say, "Hello");