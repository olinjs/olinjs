var http = require('http');
var fs = require('fs');
var url = require('url');
var server = http.createServer(function (req, res) {
	var urlObject = url.parse(req.url, true);
	var isoTime = urlObject.query.iso;
	var pathname = urlObject.pathname;
	if (pathname === '/api/parsetime') {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		dateObj = new Date(isoTime); // had the hardest time on creating a date object (lack of focus)
		json = {
			'hour': dateObj.getHours(),
			'minute': dateObj.getMinutes(),
			'second': dateObj.getSeconds()
		}
		res.end(JSON.stringify(json))
	}
	else if (pathname === '/api/unixtime') {
		// returns milliseconds
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end({ 'unixtime': Date.parse(isoTime) }.stringify()) 
	}
	else {
		res.writeHead(404);
		res.end();
	}
	
	/* 
	appropriate JSON response for parsetime
	{
	      "hour": 14,
	      "minute": 23,
	      "second": 15
    }

    appropriate JSON response for unixtime
    { "unixtime": 1376136615474 }
    */


});
server.listen(process.argv[2]);