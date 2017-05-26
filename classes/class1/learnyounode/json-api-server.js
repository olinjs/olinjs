var http = require('http');
var url  = require('url');
var urlObj;
var date;
var resObj;

server = http.createServer( function(req,res) {
	res.writeHead(200, { 'Content-Type': 'application/json' });
	urlObj = url.parse(req.url, true);

	if (urlObj.pathname == '/api/parsetime') {
		date = new Date(urlObj.query.iso);
		resObj = {
					hour:   date.getHours(),
					minute: date.getMinutes(),
					second: date.getSeconds()
				 };
		res.end(JSON.stringify(resObj))

	} else if (urlObj.pathname == '/api/unixtime') {
		date = Date.parse(urlObj);
		resObj = { 'unixtime': date };
		res.end(JSON.stringify(resObj));
	}
});
server.listen(process.argv[2]);
