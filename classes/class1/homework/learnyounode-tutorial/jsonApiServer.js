var http = require('http');
var fs = require('fs');
var url = require('url');


var server = http.createServer(function callback(req, res) {
	if (req.method != 'GET') {
		return res.end('Give me a GET, fool.\n')
	}

	var obj = {};
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var date = new Date(query['iso'])

	if (url_parts['pathname'] == '/api/parsetime') {
		// console.log("url: ", url_parts);

		obj['hour'] = date.getHours();
		obj['minute'] = date.getMinutes();
		obj['second'] = date.getSeconds();

		// console.log("obj: ", obj);

		res.writeHead(200, { 'Content-Type': 'application/json'});
		// console.log("JSON.stringify(obj): ", JSON.stringify(obj));
		res.write(JSON.stringify(obj));
		res.end();
	}

	if (url_parts['pathname'] == '/api/unixtime') {
		res.write(JSON.stringify({"unixtime": date.getTime() / 1000}))
		res.end();
	}
	

}).listen(process.argv[2])