var http = require('http')
var url = require('url')

var server = http.createServer(function (req, res) {

	var content = url.parse(req.url, true)
	var path = url.parse(req.url).pathname
	var time = new Date(content.query.iso)
	var result;

	if (path == '/api/parsetime') result = parsetime(time)
	else if (path =='/api/unixtime') result = unixtime(time)

	if (result) {
		res.writeHead(200, {'Content-Type': 'application/json'})
		res.end(JSON.stringify(result))
	}
	else {
		res.writeHead(400)
		res.end()
	}
})

server.listen(process.argv[2])

function parsetime(time) {
	return {
		hour: time.getHours(),
		minute: time.getMinutes(),
		second: time.getSeconds()
	}
}

function unixtime(time) {
	return {
		unixtime: time.getTime()
	}
}