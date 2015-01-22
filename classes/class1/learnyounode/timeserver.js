var net = require('net')
var strftime = require('strftime')
var server = net.createServer(function (socket) {
	// time format: "YYYY-MM-DD hh:mm"
	socket.end(strftime('%Y-%m-%d %H:%M%n'))
})
server.listen(process.argv[2])