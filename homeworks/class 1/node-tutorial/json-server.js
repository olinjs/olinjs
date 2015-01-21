var http = require('http');
var url = require('url');

// -- Function Definitions
function isoToUNIX (isoDate) {
	return JSON.stringify({
		'unixtime': isoDate.getTime()
	});
}

function isoToJSON (isoDate) {
	return JSON.stringify({
		'hour': 	isoDate.getHours(),
		'minute': 	isoDate.getMinutes(),
		'second': 	isoDate.getSeconds()
	});
}

// -- Server Code
var server = http.createServer( function (req, res) {

	// Get url data from request
	var url_data = url.parse(req.url, true);

	// Route the request
	var response_data;
	var isoDate = new Date(url_data.query.iso);
	if (url_data.pathname === '/api/parsetime')
		response_data = isoToJSON(isoDate);
	else if (url_data.pathname === '/api/unixtime')
		response_data = isoToUNIX(isoDate);

	// Send response
	if (response_data) {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(response_data);
	} else {
		res.writeHead(404);
		res.end();
	}

});

// -- Running Code
server.listen(+process.argv[2]);
