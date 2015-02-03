// Imports
var formidable = require("formidable");
var http = require ("http");
var url = require("url");

// Exports
exports.start = function (port, route, handle) {
	http.createServer(function(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");

		var postData = "";
		request.setEncoding("utf8");


		request.addListener("data", function(postChunk){
			postData += postChunk;
			console.log("Recieved chunk " + postChunk);
		});

		request.addListener("end", function() {
			route(handle, pathname, response, postData);
		});
	}).listen(port);

	console.log("Server started on port " + port + ".");
};