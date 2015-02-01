var http = require('http');
var url = require('url');

http.createServer(function (request,response) {
	var parsed = url.parse(request.url,true);
	var date = new Date(parsed.query.iso);
	var fin;
	if (parsed.pathname == '/api/parsetime')
		fin = {
			hour: date.getHours(),
			minute: date.getMinutes(),
			second: date.getSeconds()
		}
	else if (parse.pathname == '/api/unixtime')
		fin = {
			unixtime: date.getTime()
		}
	response.writeHead(200, { 'Content-Type': 'application/json'})
	response.end(JSON.stringify(fin))
}).listen(process.argv[2]);