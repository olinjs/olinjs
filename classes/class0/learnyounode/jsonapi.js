var url = require('url');
var http = require('http');
var port = process.argv[2];
var path = '/api/parsetime';

function makeJson (hr, min, sec) {
	var json_date = {
		"hour": hr,
		"minute": min,
		"second": sec
	}
	return json_date;
}

var server = http.createServer(function (request, response) {
	response.writeHead(200, { 'Content-Type': 'application/json' });
	info = url.parse(request.url, true);
	if (info.pathname == path) {
		var date = new Date(info.query['iso']);
		console.log(makeJson(date.getHours(), date.getMinutes(), date.getSeconds()));
		response.end("");
	}
});

server.listen(port);