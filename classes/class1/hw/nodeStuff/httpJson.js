var http = require('http')
var url = require('url')

	function parsetime (time) {
      return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
      }
    }
    
    function unixtime (time) {
      return { unixtime : time.getTime() }
    }

var server = http.createServer(function(request, response){

	var parsedUrl = url.parse(request.url, true)
	var time = new Date(parsedUrl.query.iso)
    var resultTime

	if (/parsetime/.test(request.url))
        resultTime = parsetime(time)
    else if (/unixtime/.test(request.url))
        resultTime = unixtime(time)

    if (resultTime) {
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(resultTime))
      } else {
        response.writeHead(404)
        response.end()
      }
})
server.listen(process.argv[2])