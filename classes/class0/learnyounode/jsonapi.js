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
	return JSON.stringify(json_date);
}

var server = http.createServer(function (request, response) {
	// response.writeHead(200, { 'Content-Type': 'application/json' });
	info = url.parse(request.url, true);
	if (info.pathname == path) {
		var date = new Date(info.query['iso']);
		response.end(makeJson(date.getHours(), date.getMinutes(), date.getSeconds()));
	}
});

server.listen(port);

// Official Solution

// var http = require('http')
// var url = require('url')

// function parsetime (time) {
//   return {
//     hour: time.getHours(),
//     minute: time.getMinutes(),
//     second: time.getSeconds()
//   }
// }

// function unixtime (time) {
//   return { unixtime : time.getTime() }
// }

// var server = http.createServer(function (req, res) {
//   var parsedUrl = url.parse(req.url, true)
//   var time = new Date(parsedUrl.query.iso)
//   var result

//   if (/^\/api\/parsetime/.test(req.url))
//     result = parsetime(time)
//   else if (/^\/api\/unixtime/.test(req.url))
//     result = unixtime(time)

//   if (result) {
//     res.writeHead(200, { 'Content-Type': 'application/json' })
//     res.end(JSON.stringify(result))
//   } else {
//     res.writeHead(404)
//     res.end()
//   }
// })
// server.listen(Number(process.argv[2]))
