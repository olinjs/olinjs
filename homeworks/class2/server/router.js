exports.route = function route (handle, pathname, response, postData) {
	console.log("Routing request for " + pathname);

	if (typeof handle[pathname] === 'function') {
		console.log("Request routed to" + pathname + ".");
		return handle[pathname](response, postData);
	} else {
		console.log("No request handler found for " + pathname);
		response.writeHead(400, {"Content-Type": "text/plain"});
		response.end("404 Not Found");
	}
};