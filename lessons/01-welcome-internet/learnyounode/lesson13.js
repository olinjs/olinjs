var http = require('http');
var url = require('url');

var server = http.createServer(callback)
server.listen(process.argv[2])

function callback (request,response) { 
	var requestInfo = url.parse(request.url, true);
	if (requestInfo.pathname == '/api/parsetime') {
		response.writeHead(200, { 'Content-Type': 'application/json' })
		var timeDict = {};
		var date = new Date(requestInfo.query.iso);
		timeDict['hour'] = date.getHours();
		timeDict['minute'] = date.getMinutes();
		timeDict['second'] = date.getSeconds();
		var json = JSON.stringify(timeDict);
		response.end(json);
		//console.log(requestInfo.query.iso);
	} else if (requestInfo.pathname == '/api/unixtime') {
		response.writeHead(200, { 'Content-Type': 'application/json' })
		var timeDict = {};
		var date = new Date(requestInfo.query.iso);
		timeDict['unixtime'] = date.getTime();
		var json = JSON.stringify(timeDict);
		response.end(json);
		console.log(requestInfo.query.iso);
	} else {
		response.writeHead(404)  
		response.end()  
	}
}