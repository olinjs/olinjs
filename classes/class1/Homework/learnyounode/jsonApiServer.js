var http = require('http');
var url = require ('url');

var server = http.createServer (function (req, res) {
	var parsedUrl = url.parse(req.url, true);
	var date = new Date (parsedUrl.query.iso);
	var result;
	time=  {
		hour: date.getHours(),
	 	minute: date.getMinutes(), 
	 	second: date.getSeconds()
		}
	unixtime = {
		unixtime: date.getTime()
		}

	if (/^\/api\/parsetime/.test(req.url))
    	result = time;
  	else if (/^\/api\/unixtime/.test(req.url))
    	result = unixtime;

  	if (result) {
    	res.writeHead(200, { 'Content-Type': 'application/json' })
    	res.end(JSON.stringify(result))
  	} 
  	else {
    	res.writeHead(404)
    	res.end()
  	}
});

server.listen(process.argv[2]);